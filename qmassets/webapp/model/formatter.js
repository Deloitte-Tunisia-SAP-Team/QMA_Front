sap.ui.define([], function () {
    "use strict";

    return {
        formatStatusClass: function (sStatus) {
            switch (sStatus) {
                case "Rejected":
                    return "redText";
                case "Accepted":
                    return "greenText";
                case "Pending":
                    return "orangeText";
                default:
                    return "";
            }
        }
    };
});
