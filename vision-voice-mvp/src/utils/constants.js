export function processVoiceCommand(command) {
  const text = command.toLowerCase();

  if (text.includes("your name")) return "I'm your AI assistant 😊";
  if (text.includes("time")) return `It's ${new Date().toLocaleTimeString()}`;
  if (text.includes("date")) return `Today is ${new Date().toLocaleDateString()}`;
  if (text.includes("camera")) return "The camera is detecting objects in real time.";
  if (text.includes("who am i")) return "You're the awesome user talking to me! 🧠";

  return "Hmm... I didn't understand that. Try asking something else!";
}
