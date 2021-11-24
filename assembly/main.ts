import { PostedMessage, messages } from './model';
import { PersistentSet } from "near-sdk-as";


// --- contract code goes below

// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 100;
const name_list = new PersistentSet<string>("n");
/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */

export function addMessage(text: string): string {
  const message = new PostedMessage(text);
  if(!name_list.has(message.sender)){
 // Creating a new message and populating fields with our data
 // Adding the message to end of the the persistent collection
    messages.push(message);
    name_list.add(message.sender);
    return "success";
  }
  return "fail";
 
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getMessages(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = messages[i + startIndex];
  }
  return result;
}
