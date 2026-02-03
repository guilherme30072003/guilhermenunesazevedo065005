export const useInputMasks = () => {
    const maskPhone = (value: string) => {
        if (!value) return '';
        const numbers = value.replace(/\D/g, '');

        if (numbers.length <= 10) {
            return numbers.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
                let result = '';
                if (p1) result += `(${p1}`;
                if (p2) result += `) ${p2}`;
                if (p3) result += `-${p3}`;
                return result;
            });
        } else {
            return numbers.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, `($1) $2-$3`);
        }
    };

    const maskCPF = (value: string) => {
        if (!value) return '';
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, (match, p1, p2, p3, p4) => {
            let result = '';
            if (p1) result += p1;
            if (p2) result += `.${p2}`;
            if (p3) result += `.${p3}`;
            if (p4) result += `-${p4}`;
            return result;
        });
    };

    return { maskPhone, maskCPF };
};
