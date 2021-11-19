export default function (num) {
  const n = Number(num);
  return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
    const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
    return currency;
  })}`;
}

// 金額前$的符號 Filter
// 1. 在src新增filters資料底下新增currency.js
// 2. main.js注入此js檔案
// 3. products.vue中引用 {{item.price | currency}}