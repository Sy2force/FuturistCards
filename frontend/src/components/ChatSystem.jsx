import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  UserIcon,
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
  FaceSmileIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline';

const ChatSystem = ({ isOpen, onClose, selectedUser = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Mock data for conversations
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        user: {
          name: 'Sarah Cohen',
          avatar: '👩‍💼',
          status: 'online',
          lastSeen: 'En ligne'
        },
        lastMessage: 'Merci pour votre carte de visite !',
        timestamp: '14:30',
        unread: 2
      },
      {
        id: 2,
        user: {
          name: 'David Levi',
          avatar: '👨‍💻',
          status: 'away',
          lastSeen: 'Il y a 5 min'
        },
        lastMessage: 'Pouvons-nous planifier une réunion ?',
        timestamp: '13:45',
        unread: 0
      },
      {
        id: 3,
        user: {
          name: 'Rachel Mizrahi',
          avatar: '👩‍🎨',
          status: 'offline',
          lastSeen: 'Il y a 2h'
        },
        lastMessage: 'Excellent travail sur le design !',
        timestamp: '12:15',
        unread: 1
      }
    ];

    setConversations(mockConversations);

    // Auto-select conversation if user is provided
    if (selectedUser) {
      const conversation = mockConversations.find(conv => 
        conv.user.name.toLowerCase().includes(selectedUser.toLowerCase())
      );
      if (conversation) {
        setActiveConversation(conversation);
        loadMessages(conversation.id);
      }
    }
  }, [selectedUser]);

  const loadMessages = (conversationId) => {
    // Mock messages for the conversation
    const mockMessages = [
      {
        id: 1,
        senderId: conversationId,
        text: 'Salut ! J\'ai vu votre carte de visite sur FuturistCards.',
        timestamp: '14:25',
        isOwn: false
      },
      {
        id: 2,
        senderId: 'me',
        text: 'Bonjour ! Merci de m\'avoir contacté. Comment puis-je vous aider ?',
        timestamp: '14:27',
        isOwn: true
      },
      {
        id: 3,
        senderId: conversationId,
        text: 'Je suis intéressé par vos services. Pouvons-nous discuter ?',
        timestamp: '14:28',
        isOwn: false
      },
      {
        id: 4,
        senderId: 'me',
        text: 'Bien sûr ! Je serais ravi de discuter de vos besoins.',
        timestamp: '14:29',
        isOwn: true
      }
    ];

    setMessages(mockMessages);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const message = {
      id: messages.length + 1,
      senderId: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = {
        id: messages.length + 2,
        senderId: activeConversation.id,
        text: 'Merci pour votre message ! Je vais vous répondre bientôt.',
        timestamp: new Date().toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isOwn: false
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectConversation = (conversation) => {
    setActiveConversation(conversation);
    loadMessages(conversation.id);
    
    // Mark as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unread: 0 }
          : conv
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl h-[600px] glass border border-white/20 rounded-2xl overflow-hidden flex"
      >
        {/* Conversations List */}
        <div className="w-1/3 border-r border-white/20 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
              <h2 className="text-white font-semibold">Messages</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                onClick={() => selectConversation(conversation)}
                className={`
                  p-4 border-b border-white/10 cursor-pointer transition-colors
                  ${activeConversation?.id === conversation.id ? 'bg-white/10' : ''}
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                      {conversation.user.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(conversation.user.status)} rounded-full border-2 border-gray-800`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-medium truncate">
                        {conversation.user.name}
                      </h3>
                      <span className="text-white/60 text-xs">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>

                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {conversation.unread}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/20 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xl">
                      {activeConversation.user.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(activeConversation.user.status)} rounded-full border-2 border-gray-800`}></div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {activeConversation.user.name}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {activeConversation.user.lastSeen}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <VideoCameraIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`
                        max-w-xs lg:max-w-md px-4 py-2 rounded-2xl
                        ${message.isOwn 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white/10 text-white border border-white/20'
                        }
                      `}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-white/60'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex items-end space-x-2">
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <PaperClipIcon className="h-5 w-5" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Tapez votre message..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="1"
                      style={{ minHeight: '40px', maxHeight: '120px' }}
                    />
                  </div>

                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <FaceSmileIcon className="h-5 w-5" />
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`
                      p-2 rounded-lg transition-colors
                      ${newMessage.trim() 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-white/10 text-white/40 cursor-not-allowed'
                      }
                    `}
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            /* No Conversation Selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ChatBubbleLeftRightIcon className="h-16 w-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-white/60 text-lg font-medium mb-2">
                  Sélectionnez une conversation
                </h3>
                <p className="text-white/40">
                  Choisissez une conversation pour commencer à discuter
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatSystem;
