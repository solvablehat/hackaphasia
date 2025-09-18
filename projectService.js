import axios from "axios";

export const getNER = async (textData) => {
    try {
        const response = await axios.post("http://localhost:5678/webhook-test/738cf909-50b8-4b48-b4bd-39c135223b68", {
            pdfText: textData
        });
        if (response && response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("SOME ERROR: ", error);
        throw error;  // Re-throw to handle in caller if needed
    }
};