const topics = {}; // All relevant topics will be added here

function subscribe(topic, callback){
    if(typeof topic !== 'string') throw new Error('Unable to subscribe: Topic must be a string.');
    if(typeof callback !== 'function') throw new Error('Unable to subscribe: Callback must be a function.');

    // Create the topic's object if not yet created
    if(!topics.hasOwnProperty(topic)) topics[topic] = [];

    // Add callback to the queue, storing the index for possible removal
    const index = topics[topic].push(callback) -1;

    // Provide handle back for removal of topic
    return {
        remove: () => {
            delete topics[topic][index];
        }
    };
}

function publish(topic, info){
    if(typeof topic !== 'string') throw new Error('Unable to publish: Topic must be a string.');

    // If the topic doesn't exist, or there are no listeners in queue, just leave
    if(!topics.hasOwnProperty(topic) || topics[topic].lenght == 0) return;

    // Cycle through topics queue, firing all listeners with INFO
    topics[topic].forEach((cb) => {
        cb((info != undefined) ? info : {});
    });
}

module.exports = {
    'subscribe': subscribe,
    'publish': publish
}

/*
newFile
openFile
saveFile
saveFileAs
revertFile
closeFile
closeEditor
showAbout
*/

function showAboutInfo(){
    //TBD
    //alert('Marlon Dias, 2017. Made in Brazil.');
}
