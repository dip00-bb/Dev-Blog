import { toast } from "react-toastify"
import axiosPublic from "../axios/useAxiosPublic"

export const checkPremiumUser = async (userId) => {
    try {
        const response = await axiosPublic.get(`/save-user/${userId}`);
        const status=response?.data?.userPaymentStatus
        return status;
    } catch (error) {
        toast.error(error);
    }
}