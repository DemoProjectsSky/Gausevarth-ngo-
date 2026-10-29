// Foundation's verified payment details (used by the Donate and Campaigns pages).
export const BANK = {
  name: 'GAUSEVARATHA SWAYAM SEVAK CHARITABLE FOUNDATION',
  bank: 'UCO Bank',
  account: '08810210003183',
  ifsc: 'UCBA0000881',
  upi: 'gauseva3183@ucobank',
}

// Opens the donor's UPI app (phones). Amount and note are optional.
export function upiLink(amount, note) {
  const p = new URLSearchParams({ pa: BANK.upi, pn: BANK.name, cu: 'INR' })
  if (amount) p.set('am', String(amount))
  if (note) p.set('tn', note)
  return `upi://pay?${p.toString()}`
}
