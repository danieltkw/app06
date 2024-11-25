export default {
    async fuzzyMatch(str1, str2) {
        try {
            // Ensure inputs are valid strings
            if (typeof str1 !== "string" || typeof str2 !== "string") {
                console.error("fuzzyMatch received invalid inputs:", { str1, str2 });
                return 0; // Return 0 similarity for invalid inputs
            }

            // Calculate similarity using a basic Levenshtein-based approach
            const len1 = str1.length;
            const len2 = str2.length;

            if (len1 === 0 || len2 === 0) {
                return 0; // Return 0 if either string is empty
            }

            let distance = 0;
            for (let i = 0; i < Math.min(len1, len2); i++) {
                if (str1[i] !== str2[i]) {
                    distance++;
                }
            }
            return ((len1 + len2) - distance) / (len1 + len2); // Similarity score
        } catch (error) {
            console.error("Error in fuzzyMatch function:", error);
            return 0;
        }
    }
};
// File: fuzzyMatch.js
