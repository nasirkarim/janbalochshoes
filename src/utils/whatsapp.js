export const WHATSAPP_NUMBER = '923315971035';
export const DISPLAY_PHONE = '+92 331 5971035';
export const BRAND_NAME = 'JAN BALOCH SHOES STORE';

/**
 * Build direct WhatsApp URL for generic inquiry
 */
export const getWhatsAppDirectUrl = (message = `Hello ${BRAND_NAME}! I would like to inquire about your footwear collection.`) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate Product-level WhatsApp order link
 */
export const getProductWhatsAppUrl = ({
  productName,
  size,
  color,
  quantity = 1,
  productUrl = typeof window !== 'undefined' ? window.location.href : '',
}) => {
  const message = [
    `Hello ${BRAND_NAME}!`,
    '',
    'I want to inquire and order the following footwear:',
    '',
    `Product: ${productName}`,
    size ? `Size: ${size}` : null,
    color ? `Color: ${color}` : null,
    `Quantity: ${quantity}`,
    '',
    'Please confirm price, availability, and delivery details.',
    productUrl ? `Product URL: ${productUrl}` : null,
    '',
    'Thank you!'
  ].filter(line => line !== null).join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate Cart-level WhatsApp order link
 */
export const getCartWhatsAppUrl = (cartItems) => {
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const itemsBreakdown = cartItems.map((item, idx) => {
    let details = `${idx + 1}. ${item.name} (Qty: ${item.quantity})`;
    if (item.selectedSize) details += `\n   - Size: ${item.selectedSize}`;
    if (item.selectedColor) details += `\n   - Color: ${item.selectedColor}`;
    return details;
  }).join('\n\n');

  const message = [
    `Hello ${BRAND_NAME}!`,
    '',
    'I would like to place an order for the following items in my cart:',
    '',
    itemsBreakdown,
    '',
    '-------------------------',
    `Total Items: ${totalQuantity}`,
    '-------------------------',
    '',
    'Please confirm final price quote, stock availability, and delivery timeline for my location.',
    '',
    'Thank you!'
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
