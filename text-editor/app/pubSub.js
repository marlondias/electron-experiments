class PubSub{
    static subscribe(topic, callback){
        if(typeof topic !== 'string') throw new Error('Unable to subscribe: Topic must be a string.');
        if(typeof callback !== 'function') throw new Error('Unable to subscribe: Callback must be a function.');

        // Create the topic's object if not yet created
        if(!PubSub.topics.hasOwnProperty(topic)) PubSub.topics[topic] = [];

        // Add callback to the queue, storing the index for possible removal
        const index = PubSub.topics[topic].push(callback) -1;

        console.log('SUBSCRIBE ' + topic);
        console.log(PubSub.showTopics());

        // Provide handle back for removal of topic
        return {
            remove: () => {
                delete PubSub.topics[topic][index];
            }
        };
    }

    static publish(topic, info){
        if(typeof topic !== 'string') throw new Error('Unable to publish: Topic must be a string.');

        // If the topic doesn't exist, or there are no listeners in queue, just leave
        if(!PubSub.topics.hasOwnProperty(topic)) return;

        // Cycle through topics queue, firing all listeners with INFO
        PubSub.topics[topic].forEach((cb) => {
            cb((info != undefined) ? info : {});
        });

        console.log('PUBLISH ' + topic);
        console.log(PubSub.showTopics());
    }

    static showTopics(){
        let str = 'TOPICS: ';
        for(let t in PubSub.topics){
            if(PubSub.topics.hasOwnProperty(t)){
                str += (t + '; ');
            }
        }
        return str;
    }
}
PubSub.topics = {}; // All relevant topics will be added here

module.exports = PubSub;

/*
newFile
openFile
saveFile
saveFileAs
revertFile
closeFile
closeEditor
showAbout
slideTabs (direction)
focusTab (id)
*/
