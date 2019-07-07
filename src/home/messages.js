import {
    settings
} from "cluster";

// Ensure that the last 5 messages are held in the notification area

function messageHandler() {

    settings.set('notify.notify', '')



}