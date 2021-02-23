export const Utils = {
    formatAmount(value: number) {
        value = value * 100

        return Math.round(value)
    },

    formatDate(date: string) {
        let splittedDate = date.split('T')[0].split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}` 
    },

    formatCurrency(value: string | number) {

        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    },

    cssClass(value: any) {

        if (value > 0) {
            return "income"
        } else {
            return "expense"
        }
    }
}

