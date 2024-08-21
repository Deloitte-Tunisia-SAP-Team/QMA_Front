sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "qmassets/model/formatter"
],
function (Controller, JSONModel, MessageToast, formatter) {
    "use strict";

    return Controller.extend("qmassets.controller.Issue_Details_view", {
        // formatStatusClass: function (sStatus) {
        //     switch (sStatus) {
        //         case "Rejected":
        //             return "redText";
        //         case "Accepted":
        //             return "greenText";
        //         case "Pending":
        //             return "orangeText";
        //         default:
        //             return "";
        //     }
        // },
        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var sUrl = oItem.getUrl();
            var sMimeType = oItem.getMediaType();

            if (sMimeType.startsWith("image/")) {
                this._openImageDialog(sUrl);
            } else {
                MessageToast.show("This is not an image.");
            }
        },

        _openImageDialog: function (sUrl) {
            var oView = this.getView();

            if (!this._pImageDialog) {
                this._pImageDialog = Fragment.load({
                    id: oView.getId(),
                    name: "qmassets.view.Attachments", // Ensure this matches the dialog ID in the XML fragment
                    controller: this
                }).then(function (oImageDialog) {
                    oView.addDependent(oImageDialog);
                    return oImageDialog;
                });
            }

            this._pImageDialog.then(function (oImageDialog) {
                oImageDialog.open();
                oImageDialog.byId("dialogImage").setSrc(sUrl);
            });
        },
        onInit: function () {
            // // Example status, this would typically come from the model
            // var status = "Pending";
            
            // // Set the status value to a property or handle it as needed
            // this.getView().byId("statusText").setText(status);



            var oCommentsModel = new JSONModel();
            oCommentsModel.loadData("/home/user/projects/qmassets/webapp/model/comments.json");
            this.getView().setModel(oCommentsModel);
            console.log(oCommentsModel);
        },
        onPostComment: function(oEvent) {
            
            var oModel = this.getView().getModel();
            var sValue = oEvent.getParameter("value");

            // Get the current date and time
            var oDate = new Date();
            var sDate = oDate.toLocaleDateString() + " " + oDate.toLocaleTimeString();

            // Get the current comments array from the model
            var aComments = oModel.getProperty("/comments") || [];

            // Add the new comment
            aComments.unshift({
                author: "Current User",
                icon: "sap-icon://person-placeholder",
                date: sDate,
                text: sValue
            });

            // Update the model
            oModel.setProperty("/comments", aComments);

            // Clear the FeedInput
            oEvent.getSource().setValue("");

            MessageToast.show("Comment posted!");
        }
    });
});
