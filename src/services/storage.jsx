const PRODUCT_KEY = "list";

export function getProduct() {
  const data = localStorage.getItem(PRODUCT_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProduct(list) {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(list));
}
