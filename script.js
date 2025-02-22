document.addEventListener("DOMContentLoaded", function () {
    updateTotalRent();
});

function updateTotal(input, rate) {
    let row = input.closest("tr");
    let days = row.querySelector("td:nth-child(3) input").value;
    let quantity = row.querySelector("td:nth-child(4) input").value;
    let total = row.querySelector(".totalPrice");

    if (days < 1) days = 1;
    if (quantity < 1) quantity = 1;

    let totalPrice = days * quantity * rate;
    total.textContent = "₹" + totalPrice;

    updateTotalRent();
}

function updateTotalRent() {
    let totalRent = 0;
    document.querySelectorAll(".totalPrice").forEach(priceCell => {
        totalRent += parseInt(priceCell.textContent.replace("₹", "")) || 0;
    });
    document.getElementById("totalRent").textContent = totalRent;
}

function generateInvoice() {
    let invoiceContent = "📜 **NIRAKAR TENT HOUSE PARASOLI**\n";
    invoiceContent += "📞 मोबाइल नंबर: 9756426774, 9917793938\n\n";
    invoiceContent += "🛒 *आपका किराया विवरण:*\n";

    document.querySelectorAll("#itemsTable tr").forEach(row => {
        let item = row.querySelector("td:first-child").textContent;
        let rate = row.querySelector("td:nth-child(2)").textContent;
        let days = row.querySelector("td:nth-child(3) input").value;
        let quantity = row.querySelector("td:nth-child(4) input").value;
        let total = row.querySelector(".totalPrice").textContent;

        if (parseInt(quantity) > 0) {
            invoiceContent += `✅ ${item}: ${quantity} x ${days} दिन = ${total}\n`;
        }
    });

    invoiceContent += `\n💰 **कुल किराया: ₹${document.getElementById("totalRent").textContent}**\n`;
    
    alert(invoiceContent); // Invoice popup

    shareInvoice(invoiceContent); // Share function call
}

function shareInvoice(invoiceText) {
    if (navigator.share) {
        navigator.share({
            title: "Invoice - NIRAKAR TENT HOUSE PARASOLI",
            text: invoiceText,
        }).then(() => console.log("Invoice Shared Successfully!"))
          .catch((error) => console.log("Sharing failed:", error));
    } else {
        alert("आपका ब्राउज़र शेयरिंग सपोर्ट नहीं करता!");
    }
}
