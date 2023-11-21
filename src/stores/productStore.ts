import { makeAutoObservable } from "mobx";
import { UseFormReturn, FieldValues } from "react-hook-form";

const productStore = () => {
    return makeAutoObservable({
        form: null as UseFormReturn<FieldValues, any, undefined>,
    });
};

export default productStore;
