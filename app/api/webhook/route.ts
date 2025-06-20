import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'
const midtransClient = require("midtrans-client");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders })
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const order_id = searchParams.get('order_id')
    const transaction_status = searchParams.get('transaction_status')
    const status_code = searchParams.get('status_code')

    if (!order_id || !transaction_status) {
      return new NextResponse('Missing required parameters', { 
        status: 400,
        headers: corsHeaders
      })
    }

    console.log(`[WEBHOOK-GET] Order ID: ${order_id}, Status: ${transaction_status}`)

    // Update order status
    const status = mapStatus(transaction_status)
    await updateOrderStatus(order_id, status)

    // return NextResponse.redirect(new URL('/thank-you', req.url), {
    //   headers: corsHeaders
    // })

  } catch (error) {
    console.error('[WEBHOOK-GET-ERROR]', error)
    return new NextResponse('Internal error', { 
      status: 500,
      headers: corsHeaders
    })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const apiClient = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    })

    const statusResponse = await apiClient.transaction.notification(body)
    const transaction_code = statusResponse.order_id
    const transactionStatus = statusResponse.transaction_status
    const fraudStatus = statusResponse.fraud_status

    console.log(`[WEBHOOK-POST] Order ID: ${transaction_code}, Status: ${transactionStatus}, Fraud: ${fraudStatus}`)

    // Update order status
    const status = mapStatus(transactionStatus, fraudStatus)
    await updateOrderStatus(transaction_code, status)

    return new NextResponse('OK', { 
      status: 200,
      headers: corsHeaders
    })

  } catch (error) {
    console.error('[WEBHOOK-POST-ERROR]', error)
    return new NextResponse('Internal error', { 
      status: 500,
      headers: corsHeaders
    })
  }
}

// Helper functions
function mapStatus(transactionStatus: string, fraudStatus?: string): string {
  if (transactionStatus === 'capture') {
    return fraudStatus === 'accept' ? 'success' : 'challenge'
  } else if (transactionStatus === 'settlement') {
    return 'success'
  } else if (['cancel', 'expire'].includes(transactionStatus)) {
    return 'failure'
  }
  return 'pending'
}

async function updateOrderStatus(orderId: string, status: string) {
  const existingOrder = await prismadb.order.findUnique({
    where: { transaction_code: orderId }
  })

  if (!existingOrder) {
    console.warn(`[WEBHOOK] Order not found: ${orderId}`)
    throw new Error('Order not found')
  }

  if (existingOrder.status !== status) {
    await prismadb.order.update({
      where: { transaction_code: orderId },
      data: { status },
    })
    console.log(`[WEBHOOK] Updated order ${orderId} to status: ${status}`)
  } else {
    console.log(`[WEBHOOK] Order ${orderId} already has status: ${status}`)
  }
}