export interface StripeCheckoutResponse {
  id: string;
  object: string;
  url: string;
  status: string;
  payment_status?: string;
  amount_total?: number;
  currency?: string;
}
