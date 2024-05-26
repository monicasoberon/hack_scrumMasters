const OpenAI = require('openai');
const openai = new OpenAI('sk-proj-sk-proj-ZbThPEDxvDocer0kLYugT3BlbkFJ3Jcl1NkueunTL7ODHwAX');
 
async function connect(id) { 
    const conversation = await openai.beta.conversations.create({ assistant: id });

    // You can now use the 'conversation' object to interact with your assistant
    // For example, to send a message to the assistant:
    const message = {
      role: 'system',
      content: 'You are a helpful assistant.'
    };
    const response = await conversation.addMessage(message);
    console.log(response);
  }

async function createThread() {
    const thread = await openai.beta.threads.create();
    // You can now use the 'thread' object
    // For example, to log the thread ID:
    console.log(thread.id);
  }
 ;

