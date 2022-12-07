import * as storage from "./storage";
import throttle from "lodash.throttle";

const form = document.querySelector("form.feedback-form");
const email = form.querySelector('input[name="email"]');
const message = form.querySelector('textarea[name="message"]');
const sendBtn = form.querySelector('button[type="submit"]');

const KEY = "feedback-form-state";

window.addEventListener("load", () => {
    const formData = storage.load(KEY);
    try {
        email.value = formData.mail;
        message.value = formData.message;
    } catch (error) { }

});

sendBtn.addEventListener("click", (event) => {
    console.log();
    event.preventDefault();
    if ((email.value == "") || (message.value == "")) {
        if (email.value == "") {
            alert("Complete your email details");
        }
        if (message.value == "") {
            alert("Complete the message text");
        }

    }
    else {
        const formData = storage.load(KEY);
        console.log(formData.mail, " : ", formData.message);
        email.value = "";
        message.value = "";
        storage.remove(KEY);
    }
});

form.addEventListener("input", throttle(() => {
    storage.save(KEY, { mail: email.value, message: message.value });
}, 500)
);