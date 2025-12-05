// Mock WebSocket/Real-time messaging setup for TrabahoHub
// In production, this would connect to a real WebSocket server (e.g., Socket.io)

// Mock message store
const messages = new Map();
const messageListeners = new Set();

// Initialize mock socket connection
export function initializeSocket(userId) {
  console.log(`[Socket] Initializing connection for user: ${userId}`);
  // In production, this would establish a WebSocket connection
  // socket = io(SOCKET_SERVER_URL, { auth: { userId } })
}

export function disconnectSocket() {
  console.log('[Socket] Disconnecting...');
  // In production: socket.disconnect()
}

// Send a message
// Helper to generate consistent conversation IDs
function getConversationId(userId1, userId2) {
  return [userId1, userId2].sort().join('-');
}

export async function sendMessage(senderId, receiverId, text) {
  const message = {
    id: String(Date.now()),
    senderId,
    receiverId,
    text,
    timestamp: new Date().toISOString(),
    read: false,
  };

  // Store message
  const conversationId = getConversationId(senderId, receiverId);
  const conversationMessages = messages.get(conversationId) || [];
  conversationMessages.push(message);
  messages.set(conversationId, conversationMessages);

  // Notify listeners
  messageListeners.forEach((listener) => listener(message));

  return message;
}

// Subscribe to new messages
export function onNewMessage(callback) {
  messageListeners.add(callback);
  return () => messageListeners.delete(callback);
}

// Get conversation messages
export function getMessages(userId1, userId2) {
  const conversationId = getConversationId(userId1, userId2);
  return messages.get(conversationId) || [];
}

// Mark messages as read
export function markAsRead(conversationId, userId) {
  const conversationMessages = messages.get(conversationId);
  if (conversationMessages) {
    conversationMessages.forEach((msg) => {
      if (msg.receiverId === userId) {
        msg.read = true;
      }
    });
  }
}

// Typing indicators (mock)
export function sendTypingIndicator(conversationId, isTyping) {
  console.log(`[Socket] Typing indicator: ${isTyping} in ${conversationId}`);
  // In production: socket.emit('typing', { conversationId, isTyping })
}

export function onTypingIndicator(callback) {
  // In production: socket.on('typing', callback)
  return () => {};
}
