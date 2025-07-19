function PayMethod() {
    return (
        <div>
            <div className="text-sm font-semibold mt-4">Вибір оплати:</div>
            <div className="flex gap-3 mt-2">
                <button className="px-14 py-12 bg-green-500/30 text-white rounded-xl hover:bg-green-600 transition">
                    LiqPay
                </button>
                <button className="px-14 py-12 bg-blue-500/30 text-white rounded-xl hover:bg-blue-600 transition">
                    Fonty
                </button>
            </div>
        </div>
    );
}

export default PayMethod;
