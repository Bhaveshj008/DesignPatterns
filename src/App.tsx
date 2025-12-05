import React, { useState, useEffect } from 'react';
import { 
  Server, Database, Globe, Cpu, Layers, Copy, Puzzle, 
  Shield, LayoutTemplate, ShieldCheck, Activity, GitBranch, 
  Terminal, Wifi, RotateCcw, CheckCircle, 
  ArrowRight, Box, Lock, HardDrive,
  FileJson, FileCode, Zap, Smartphone, ArrowDown, Monitor,
  SkipBack, CreditCard, RefreshCw,
  AlertTriangle, Check, X, MousePointerClick, ExternalLink,
  Package, Share2, Network, Anchor, Grid,
  Users, History, List, FileText, Menu,
  ChevronDown, ChevronRight
} from 'lucide-react';

// ============================================================================
// --- GLOBAL STYLES & ANIMATIONS ---
// ============================================================================
const styles = `
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 0.5; }
    100% { transform: scale(2); opacity: 0; }
  }
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-in-left {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes float-hint {
    0%, 100% { transform: translateY(0); opacity: 0.8; }
    50% { transform: translateY(-3px); opacity: 1; }
  }
    
  .animate-pulse-ring { animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }
  .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
  .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
  .animate-slide-in-left { animation: slide-in-left 0.3s ease-out forwards; }
  .animate-blink { animation: blink 1s step-end infinite; }
  .animate-hint { animation: float-hint 2s ease-in-out infinite; }

  /* Custom Scrollbar - Compact */
  .custom-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
  .custom-scroll::-webkit-scrollbar-track { background: #020617; }
  .custom-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
  .custom-scroll::-webkit-scrollbar-thumb:hover { background: #475569; }
`;

// ============================================================================
// --- PATTERN DATA (DETAILED & COMPREHENSIVE) ---
// ============================================================================
const PATTERNS = {
  // --- CREATIONAL ---
  singleton: {
    category: 'Creational', title: 'Singleton', icon: Database,
    what: "A creational pattern that restricts a class to a single instance, ensuring that ONE and ONLY ONE object of that type exists throughout the application's lifecycle, accessible globally.",
    how: "By making the class constructor private (preventing `new Class()`) and providing a static method (like `getInstance()`). This method checks if the object exists; if not, it creates it. If it does, it returns the existing reference.",
    why: "Crucial for controlling access to shared resources like database connections, file systems, or printer spoolers. It prevents data corruption and saves memory by avoiding unnecessary object creation.",
    scenario: "Database Connection Pool: Instead of opening 100 separate slow connections for 100 users, the Singleton manages a shared pool. Every part of the app asks the Singleton for a connection, ensuring efficiency."
  },
  factory: {
    category: 'Creational', title: 'Factory Method', icon: Box,
    what: "A pattern that provides an interface for creating objects in a superclass, but allows subclasses or a specific method to alter the type of objects that will be created.",
    how: "Instead of calling `new ConcreteClass()` directly, the client calls a factory method (e.g., `createPayment(type)`). This method contains the switch logic to decide which specific class (Stripe, PayPal) to instantiate and return.",
    why: "It decouples your code from specific classes. If you need to add a new payment method later, you only update the Factory logic, not every place in your app where payments are processed.",
    scenario: "Payment Gateway: An e-commerce site supports Credit Cards, PayPal, and Crypto. When a user selects a method, the Factory generates the correct processor object dynamically without the checkout page needing to know the details."
  },
  abstract_factory: {
    category: 'Creational', title: 'Abstract Factory', icon: Grid,
    what: "A creational pattern that lets you produce families of related objects without specifying their concrete classes. It acts as a super-factory that creates other factories.",
    how: "You define an interface for creating all distinct products of the product family (e.g., `createButton`, `createCheckbox`). Then you create separate factory classes (e.g., `DarkThemeFactory`, `LightThemeFactory`) that implement this interface.",
    why: "Ensures that products you use together match each other. It prevents the error of mixing a Windows-style button with a MacOS-style scrollbar, enforcing consistency across product families.",
    scenario: "Cross-Platform UI Framework: An app needs to run on Windows, Mac, and Linux. The Abstract Factory creates the correct set of UI components (Buttons, Windows, Scrollbars) for the specific OS detected at runtime."
  },
  builder: {
    category: 'Creational', title: 'Builder', icon: Layers,
    what: "A creational pattern designed to construct complex objects step-by-step. It allows you to produce different types and representations of an object using the same construction code.",
    how: "You separate the construction of an object from its representation. Instead of a massive constructor with 10 confusing parameters, you use a Builder object with readable methods like `.setCPU()`, `.setRAM()`, and finally `.build()`.",
    why: "Solves the 'Telescoping Constructor' problem. It makes code readable and less error-prone when creating objects with many optional configurations (like a computer with optional GPU, WiFi, or Storage).",
    scenario: "Server Configurator: A user wants to buy a custom server. They start with a base chassis and sequentially add a specific CPU, amount of RAM, and disk storage. The Builder assembles this custom configuration into a final object."
  },
  prototype: {
    category: 'Creational', title: 'Prototype', icon: Copy,
    what: "A pattern that lets you copy existing objects without making your code dependent on their classes. It allows creating new instances by cloning a 'prototype' instance.",
    how: "The object implements a `clone()` method. When you need a new object, instead of running a costly initialization process (like booting an OS), you essentially say 'copy memory from A to B'. It performs a deep or shallow copy.",
    why: "Performance optimization. Creating an object from scratch might involve heavy database queries or complex calculations. Cloning a pre-configured template is instant.",
    scenario: "Virtual Machine Cloning: In cloud computing, booting a fresh Windows server takes minutes. The Prototype pattern takes a 'snapshot' of a running server and clones it instantly to scale up traffic handling."
  },

  // --- STRUCTURAL ---
  adapter: {
    category: 'Structural', title: 'Adapter', icon: Puzzle,
    what: "A structural pattern that allows objects with incompatible interfaces to collaborate. It acts as a bridge between two systems that speak different languages.",
    how: "You wrap the incompatible object (the 'Adaptee') inside an Adapter class. The Adapter translates calls from the modern interface into a format the legacy object understands, and converts the response back.",
    why: "It saves you from rewriting mostly working legacy code. It allows modern applications to communicate with old databases, 3rd-party libraries, or hardware drivers that you cannot modify.",
    scenario: "Legacy Integration: Your modern React frontend expects JSON data, but the company's old 1990s database outputs XML. An Adapter sits in the middle, transparently converting XML to JSON so the frontend doesn't crash."
  },
  bridge: {
    category: 'Structural', title: 'Bridge', icon: Anchor,
    what: "A structural pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently.",
    how: "Instead of inheritance explosion (e.g., `SQLUserRepo`, `MongoUserRepo`, `SQLProductRepo`), you create two hierarchies: Repository (Abstraction) and StorageDriver (Implementation). The Repository holds a reference to a Driver.",
    why: "Prevents the 'Cartesian Product' complexity explosion. It allows you to switch the underlying database implementation (SQL vs NoSQL) without changing the high-level business logic code.",
    scenario: "Database ORM: The 'User Repository' (Abstraction) handles high-level logic like 'saveUser'. It delegates the low-level query generation to a 'Driver' (Implementation). You can switch drivers (Postgres to Mongo) without rewriting the Repository."
  },
  composite: {
    category: 'Structural', title: 'Composite', icon: Network,
    what: "A structural pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.",
    how: "You create a common interface (Component) for both individual objects (Leaves) and groups of objects (Composites). The Composite delegates work to its children, who might be Leaves or other Composites.",
    why: "Simplifies client code when dealing with recursive structures. You can call `folder.getSize()` and it automatically sums up the sizes of all files and sub-folders inside, without the client needing to know the depth.",
    scenario: "File System Explorer: A File is a leaf. A Folder is a composite that contains Files and other Folders. Operations like 'Delete' or 'Get Size' apply uniformly to both single files and entire directory trees."
  },
  decorator: {
    category: 'Structural', title: 'Decorator', icon: Shield,
    what: "A pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.",
    how: "You create a set of decorator classes (like `EncryptionDecorator`, `CompressionDecorator`) that implement the same interface as the core object. You 'wrap' the core object in these layers. Data passes through, getting modified at each step.",
    why: "Provides a flexible alternative to subclassing for extending functionality. You can mix and match behaviors at runtime (e.g., enable Encryption but disable Compression) without creating a chaotic inheritance tree.",
    scenario: "Data Stream Processing: A raw data stream needs to be secure. We wrap it in a 'Compression' layer to shrink it, and then an 'Encryption' layer to lock it. The core stream object doesn't know about these layers."
  },
  facade: {
    category: 'Structural', title: 'Facade', icon: LayoutTemplate,
    what: "A structural pattern that provides a simplified, higher-level interface to a library, a framework, or any other complex set of classes.",
    how: "You create a Facade class that sits above the messy subsystems. It exposes simple methods like `deployApp()`. Internally, this method triggers the complex sequence: compiler, linker, uploader, and server restarter.",
    why: "Reduces complexity for the consumer. Frontend developers don't need to be DevOps experts; they just press the 'Deploy' button provided by the Facade.",
    scenario: "One-Click Cloud Deploy: A deployment process involves compiling code, running unit tests, building Docker images, and pushing to AWS. The Facade wraps all this into a single function call."
  },
  flyweight: {
    category: 'Structural', title: 'Flyweight', icon: Package,
    what: "A structural pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.",
    how: "You separate object state into 'Intrinsic' (shared, immutable, e.g., texture of a bullet) and 'Extrinsic' (unique, mutable, e.g., coordinate of a bullet). The shared state is stored in a Flyweight object referenced by thousands of contexts.",
    why: "Essential for game development and graphical applications. Without it, rendering 10,000 asteroids would crash the browser due to memory limits. With it, you only store the asteroid image once.",
    scenario: "Particle System in Games: A game needs to render 10,000 bullets. Instead of loading the bullet sprite 10,000 times, we load it once (Flyweight) and re-use it, only storing the X/Y coordinates (Context) for each instance."
  },
  proxy: {
    category: 'Structural', title: 'Proxy', icon: ShieldCheck,
    what: "A pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through.",
    how: "The Proxy creates an object that looks identical to the real service. When a client calls it, the Proxy intercepts the call. It can check credentials, check cache, or check rate limits. If allowed, it forwards the call to the real object.",
    why: "Essential for Security (blocking unauthorized access), Performance (caching results to avoid heavy calls), and Stability (rate limiting to prevent server crashes).",
    scenario: "API Rate Limiter: To prevent a hacker from spamming your server, a Proxy sits in front. It counts requests from an IP. If they exceed 5 per second, the Proxy blocks them immediately; the real server never sees the traffic."
  },

  // --- BEHAVIORAL ---
  chain_of_responsibility: {
    category: 'Behavioral', title: 'Chain of Resp.', icon: List,
    what: "A behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.",
    how: "You link handler objects into a chain. The client sends the request to the first handler. That handler tries to fix it. If it can't, it calls `next.handle()`. This continues until someone handles it or the chain ends.",
    why: "Decouples the sender of a request from its receivers. You can dynamically change the chain order or add new handlers (e.g., adding a new 'Spam Filter' layer) without affecting the rest of the system.",
    scenario: "Customer Support System: A user ticket comes in. Level 1 Bot tries to answer. If it fails, it passes to Level 2 Junior Agent. If they can't solve it, it escalates to Level 3 Manager. The user just sees 'Ticket Solved'."
  },
  command: {
    category: 'Behavioral', title: 'Command', icon: Terminal,
    what: "A pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as method arguments, delay or queue a request's execution, and support undoable operations.",
    how: "Instead of performing an action directly (like `account.withdraw()`), you create a `WithdrawCommand` object containing the amount and target. This object is pushed onto a 'History Stack'. To undo, you pop the stack and call the command's `undo()` method.",
    why: "It is the backbone of 'Undo/Redo' functionality, transactional systems, and job queues. It decouples the object that invokes the operation from the one that knows how to perform it.",
    scenario: "Bank Transaction Manager: You mistakenly transfer $500. Because the transfer was wrapped in a Command object, the system can simply call `undo()` on that specific transaction record to reverse the money flow."
  },
  iterator: {
    category: 'Behavioral', title: 'Iterator', icon: ArrowRight,
    what: "A behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).",
    how: "The collection provides a method `createIterator()`. This returns an object that knows how to traverse the collection (keeping track of the current position). The client just calls `.next()` repeatedly.",
    why: "It provides a standard way to loop through complex data structures. The client doesn't need to know if it's looping through an Array, a Linked List, or a Binary Tree; the Iterator interface is the same for all.",
    scenario: "Music Playlist: A user clicks 'Next Song'. They don't care if the playlist is shuffle-mode (Random Iterator) or sequential (Sequential Iterator). The button just calls `.next()` on whatever Iterator is active."
  },
  mediator: {
    category: 'Behavioral', title: 'Mediator', icon: Users,
    what: "A behavioral design pattern that lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.",
    how: "Components (Colleagues) do not reference each other. Instead, they send events to a central Mediator (Hub). The Hub decides who needs to know about this event and routes it accordingly.",
    why: "Prevents spaghetti code where every component knows about every other component. It transforms a Many-to-Many relationship web into a simple One-to-Many star topology.",
    scenario: "Air Traffic Control: Planes (Components) do not talk to each other to decide who lands first. They talk to the Tower (Mediator). The Tower tells Plane A to land and Plane B to circle, preventing crashes."
  },
  memento: {
    category: 'Behavioral', title: 'Memento', icon: History,
    what: "A behavioral design pattern that lets you save and restore the previous state of an object without revealing the details of its implementation.",
    how: "The Originator (object to be saved) creates a 'Memento' object containing a snapshot of its internal state. This Memento is stored in a Caretaker (History list). To restore, the Memento is passed back to the Originator.",
    why: "Fundamental for implementing 'Save Game', 'Ctrl+Z' Undo, or Transaction Rollbacks. It ensures encapsulation isn't broken because only the Originator can read the Memento's contents.",
    scenario: "Text Editor History: Every time you type a sentence, the editor creates a Memento of the document state and pushes it to a stack. Pressing Ctrl+Z pops the stack and restores the text to that exact previous state."
  },
  observer: {
    category: 'Behavioral', title: 'Observer', icon: Activity,
    what: "A behavioral design pattern that defines a subscription mechanism to notify multiple 'observer' objects about any events that happen to the object they are observing.",
    how: "A 'Subject' (the data source) maintains a list of subscribers. When its state changes, it iterates through this list and calls a standard `update()` method on every subscriber to pass the new data.",
    why: "Allows for a dynamic, event-driven architecture. Components can react to changes in real-time without the data source needing to know exactly who is listening or why.",
    scenario: "System Monitoring Dashboard: A central server monitor (Subject) tracks CPU and RAM usage. When usage spikes, it notifies the 'Graph Widget', 'Log Recorder', and 'Alert System' (Observers) simultaneously."
  },
  state: {
    category: 'Behavioral', title: 'State', icon: Wifi,
    what: "A behavioral pattern that lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.",
    how: "The main object (Context) holds a reference to a 'State' object (e.g., `ConnectedState` or `DisconnectedState`). When you call `send()`, the Context delegates the work to the current State object. Changing the state means swapping this object.",
    why: "Removes massive, unreadable `switch` or `if-else` state machines. Each state's logic is safely encapsulated in its own class, making complex lifecycles (like TCP handshakes) manageable.",
    scenario: "TCP Connection Handshake: A connection behaves differently depending on whether it is 'Closed', 'Listening', or 'Established'. The 'Connect' button might start a handshake in one state, but do nothing in another."
  },
  strategy: {
    category: 'Behavioral', title: 'Strategy', icon: GitBranch,
    what: "A pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.",
    how: "You define a common interface (e.g., `RoutingStrategy`). Then you create specific classes like `RoundRobin` or `LeastConnections`. The Load Balancer accepts any strategy and calls `.getNextServer()`, indifferent to which specific algorithm is being used.",
    why: "Lets you change the behavior of an object at runtime. A system admin can switch load balancing algorithms instantly based on traffic patterns without restarting the server or breaking the code.",
    scenario: "Load Balancer: A Load Balancer needs to distribute traffic. During the day, it uses 'Round Robin'. At night, when some servers are sleeping, it switches to 'Least Connections'. The Strategy pattern makes this switch seamless."
  },
  template_method: {
    category: 'Behavioral', title: 'Template Method', icon: FileText,
    what: "A behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.",
    how: "A base class defines a method like `deployPipeline()` which calls `pullCode()`, `build()`, `test()`. Subclasses (e.g., `NodeJSPipeline`, `JavaPipeline`) override `build` and `test` with their specific commands (npm vs maven) but keep the overall sequence intact.",
    why: "Prevents code duplication when two algorithms are 90% identical but differ in small details. It enforces a strict structure while allowing flexibility in implementation.",
    scenario: "CI/CD Pipeline: You have a build pipeline for Node, Go, and Java. The steps 'Clone', 'Build', 'Deploy' are the same. The template defines the flow, while subclasses implement the specific 'npm install' or 'go build' commands."
  },
  visitor: {
    category: 'Behavioral', title: 'Visitor', icon: ExternalLink,
    what: "A behavioral design pattern that lets you separate algorithms from the objects on which they operate.",
    how: "You add a single method `accept(visitor)` to your object classes. You then create external 'Visitor' classes (like `XMLExportVisitor`, `JSONExportVisitor`). The object calls `visitor.visit(this)`, passing itself to the visitor.",
    why: "Allows you to add new operations (like Exporting, Reporting, Linting) to existing classes without modifying them. This follows the Open/Closed Principle perfectly.",
    scenario: "Shape Exporter: You have a drawing app with Circle, Square, and Triangle classes. You want to export to XML. Instead of changing every shape class to add `.toXML()`, you create an `XMLVisitor` that visits the shapes and generates the string."
  }
};

// ============================================================================
// --- EXISTING SIMULATIONS ---
// ============================================================================

const SingletonSim = () => {
  const [instanceId, setInstanceId] = useState<string | null>(null);
  const [requests, setRequests] = useState<Array<{ id: number; clientId: number; poolId: string; isNew: boolean }>>([]);
  const handleRequest = (clientId: number) => {
    let currentId = instanceId;
    let isNew = false;
    if (!currentId) {
      currentId = "0x" + Math.random().toString(16).substr(2, 6).toUpperCase();
      setInstanceId(currentId);
      isNew = true;
    }
    setRequests(p => [{ id: Date.now(), clientId, poolId: currentId, isNew }, ...p].slice(0, 4));
  };
  return (
    <div className="flex flex-col items-center gap-8 p-6 min-h-[450px] justify-center relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Click different Clients to request Instance
      </div>
      <div className="relative">
        <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 bg-slate-900 ${instanceId ? 'border-blue-500 bg-blue-900/30 shadow-[0_0_30px_rgba(59,130,246,0.4)]' : 'border-slate-600 border-dashed opacity-50'}`}>
          <Database size={36} className={instanceId ? "text-blue-400" : "text-slate-500"} />
          <div className="text-xs mt-2 font-mono text-white font-bold">{instanceId || "NULL"}</div>
        </div>
        {instanceId && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-green-400 font-mono animate-fade-in">Active Instance</div>}
      </div>
      <div className="flex gap-6">
        {[1, 2, 3].map(id => (
          <button key={id} onClick={() => handleRequest(id)} className="flex flex-col items-center gap-2 group">
            <div className="w-20 h-20 bg-slate-800 border border-slate-600 hover:border-blue-400 rounded-lg flex items-center justify-center transition-all active:scale-95 shadow-md group-hover:bg-slate-700">
              <Cpu className="text-slate-400 group-hover:text-white w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-slate-500">Client {id}</span>
          </button>
        ))}
      </div>
      <div className="w-full max-w-sm mt-2">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[10px] uppercase font-bold text-slate-500">Access Log</span>
            <button onClick={() => { setInstanceId(null); setRequests([]); }} className="text-[10px] text-red-400 hover:text-white">Reset Memory</button>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded p-2 font-mono text-[10px] text-slate-300 h-24 overflow-y-auto custom-scroll">
            {requests.map(r => (
            <div key={r.id} className="mb-1 border-b border-slate-800/50 pb-1 flex justify-between">
                <span><span className="text-slate-500">{new Date(r.id).toLocaleTimeString().split(' ')[0]}</span> Client_{r.clientId}</span>
                <span>{r.isNew ? <span className="text-yellow-400 font-bold">INIT</span> : <span className="text-green-400 font-bold">REUSE</span>} {r.poolId}</span>
            </div>
            ))}
            {requests.length === 0 && <span className="text-slate-600 italic">System Idle...</span>}
          </div>
      </div>
    </div>
  );
};

const FactorySim = () => {
  const [created, setCreated] = useState<Array<{ id: number; type: string }>>([]);
  const create = (type: string) => setCreated(p => [{ id: Date.now(), type }, ...p].slice(0,5));
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6 min-h-[450px] relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Select a payment type to instantiate
      </div>
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 w-full max-w-[240px] shadow-lg">
        <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider border-b border-slate-700 pb-2">Client Request</div>
        <div className="space-y-3">
          {[{id:'Stripe', l:'Credit Card', c:'indigo'}, {id:'PayPal', l:'PayPal', c:'blue'}, {id:'Crypto', l:'Bitcoin', c:'orange'}].map(opt => (
             <button key={opt.id} onClick={() => create(opt.id)} className={`w-full py-3 px-4 bg-${opt.c}-900/30 border border-${opt.c}-500/50 hover:bg-${opt.c}-900/50 text-${opt.c}-200 text-sm font-bold rounded flex items-center justify-between transition-all group`}>
               {opt.l} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
             </button>
          ))}
        </div>
      </div>
      <div className="hidden md:flex flex-col items-center">
         <div className="w-16 h-16 flex flex-col items-center justify-center bg-slate-900 rounded-full border-2 border-slate-600 shadow-xl z-10">
           <Box size={20} className="text-green-400" />
           <span className="text-[8px] font-bold text-white mt-1">FACTORY</span>
         </div>
      </div>
      <div className="w-full max-w-[280px] h-64 bg-slate-950 border border-slate-700 rounded-lg p-4 overflow-y-auto custom-scroll relative shadow-inner">
         <div className="text-xs font-bold text-slate-500 absolute top-2 right-2">Object Heap</div>
         <div className="space-y-3 mt-6">
           {created.map(item => (
             <div key={item.id} className={`p-3 rounded border-l-2 text-xs text-white font-mono animate-slide-up ${item.type === 'PayPal' ? 'border-blue-500 bg-blue-900/10' : item.type === 'Stripe' ? 'border-indigo-500 bg-indigo-900/10' : 'border-orange-500 bg-orange-900/10'}`}>
               <span className="opacity-50">const</span> p = <span className="text-yellow-200">new</span> {item.type}Processor();
             </div>
           ))}
           {created.length === 0 && <span className="text-slate-700 text-[10px] italic block text-center mt-10">Heap Empty</span>}
         </div>
      </div>
    </div>
  );
};

const BuilderSim = () => {
  const [specs, setSpecs] = useState<{ cpu: string; ram: string; disk: string }>({ cpu: '', ram: '', disk: '' });
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 min-h-[450px] items-center relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Select components to assemble server
      </div>
      <div className="w-full md:w-1/3 space-y-4">
        {[{ type: 'cpu' as const, label: 'CPU', opts: ['4-Core', '8-Core'], color: 'blue' },
          { type: 'ram' as const, label: 'RAM', opts: ['16GB', '32GB'], color: 'purple' },
          { type: 'disk' as const, label: 'Disk', opts: ['512GB', '1TB'], color: 'green' }
        ].map(cat => (
          <div key={cat.type} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="text-xs font-bold text-slate-400 uppercase mb-3">{cat.label}</div>
            <div className="flex gap-2">
              {cat.opts.map(opt => (
                <button key={opt} onClick={() => setSpecs(p => ({ ...p, [cat.type]: opt }))}
                  className={`flex-1 py-2 text-xs font-bold rounded border transition-all ${specs[cat.type] === opt ? `bg-${cat.color}-600 border-${cat.color}-400 text-white` : 'bg-slate-900 border-slate-600 text-slate-400 hover:bg-slate-700'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full md:w-2/3 bg-slate-950 border-2 border-slate-700 rounded-xl relative p-8 flex flex-col shadow-2xl min-h-[320px]">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-6">
            <span className="text-sm font-bold text-white flex items-center gap-2"><Server size={16}/> Server Configuration</span>
            <span className="text-xs text-slate-500 font-mono">build_id: #99A2</span>
        </div>
        <div className="w-full flex-1 flex flex-col gap-3">
           <div className={`flex items-center gap-4 p-2 rounded transition-all ${specs.cpu ? 'bg-blue-900/10 border border-blue-500/30' : 'bg-slate-900 border border-slate-800 border-dashed'}`}>
             <div className="p-2 bg-slate-800 rounded text-slate-400"><Cpu size={16}/></div>
             <div className="flex-1">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Processor</div>
                {specs.cpu ? <div className="text-blue-300 text-xs font-mono font-bold animate-fade-in">{specs.cpu} Intel Xeon</div> : <div className="text-slate-600 text-[10px]">Not Selected</div>}
             </div>
           </div>
           <div className={`flex items-center gap-4 p-2 rounded transition-all ${specs.ram ? 'bg-purple-900/10 border border-purple-500/30' : 'bg-slate-900 border border-slate-800 border-dashed'}`}>
             <div className="p-2 bg-slate-800 rounded text-slate-400"><Layers size={16}/></div>
             <div className="flex-1">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Memory</div>
                {specs.ram ? <div className="text-purple-300 text-xs font-mono font-bold animate-fade-in">{specs.ram} DDR5 ECC</div> : <div className="text-slate-600 text-[10px]">Not Selected</div>}
             </div>
           </div>
           <div className={`flex items-center gap-4 p-2 rounded transition-all ${specs.disk ? 'bg-green-900/10 border border-green-500/30' : 'bg-slate-900 border border-slate-800 border-dashed'}`}>
             <div className="p-2 bg-slate-800 rounded text-slate-400"><HardDrive size={16}/></div>
             <div className="flex-1">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Storage</div>
                {specs.disk ? <div className="text-green-300 text-xs font-mono font-bold animate-fade-in">{specs.disk} NVMe SSD</div> : <div className="text-slate-600 text-[10px]">Not Selected</div>}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const PrototypeSim = () => {
  const [vms, setVms] = useState([{ id: 1, name: 'Ubuntu_Base_Img', type: 'template' }]);
  const clone = () => setVms(p => [...p, { id: Date.now(), name: `Clone_${Math.floor(Math.random()*999)}`, type: 'clone' }]);
  return (
    <div className="flex flex-col p-6 bg-slate-900 min-h-[450px] relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Click 'Instant Clone' on the Template
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scroll mt-6">
        {vms.map(vm => (
          <div key={vm.id} className={`flex-shrink-0 w-44 h-52 rounded-lg border p-4 flex flex-col relative transition-all shadow-md ${vm.type === 'template' ? 'border-blue-500 bg-blue-900/20' : 'border-slate-600 bg-slate-800 animate-slide-up'}`}>
              <div className="flex justify-between items-start mb-3">
                <Server size={20} className={vm.type === 'template' ? 'text-blue-400' : 'text-green-400'} />
                {vm.type === 'clone' && <div className="px-1.5 py-0.5 rounded bg-green-900/50 text-[8px] text-green-400 font-bold border border-green-500/30">RUNNING</div>}
              </div>
              <div className="font-bold text-xs text-white mb-1 truncate">{vm.name}</div>
              <div className="text-[10px] text-slate-500 font-mono mb-3">PID: {vm.id.toString().slice(-4)}</div>
              <div className="flex-1 space-y-1 opacity-50">
                 <div className="h-1 w-full bg-slate-600 rounded"></div>
                 <div className="h-1 w-2/3 bg-slate-600 rounded"></div>
                 <div className="h-1 w-1/2 bg-slate-600 rounded"></div>
              </div>
              {vm.type === 'template' && (
                <button onClick={() => clone()} className="mt-auto w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded flex items-center justify-center gap-1 transition-colors">
                  <Copy size={12}/> Instant Clone
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

const AdapterSim = () => {
  const [status, setStatus] = useState('idle');
  const run = () => {
    if(status !== 'idle') return;
    setStatus('converting');
    setTimeout(() => setStatus('done'), 1500);
    setTimeout(() => setStatus('idle'), 3500);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Click 'Simulate Request' to adapt data
      </div>
      <div className="flex items-center gap-4 w-full justify-center mt-4">
        <div className="flex flex-col items-center">
           <div className="w-24 h-24 bg-slate-800 border border-red-500 rounded-lg flex flex-col items-center justify-center shadow-md relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full bg-red-900/30 border-b border-red-500/30 py-0.5 text-[8px] text-center text-red-200">Legacy API</div>
             <FileCode className="text-red-400 mb-1" size={24}/>
             <span className="text-[10px] font-bold text-red-200">XML Data</span>
           </div>
           {status !== 'idle' && <div className="text-[8px] font-mono text-red-400 mt-2 animate-fade-in">&lt;user id="1"/&gt;</div>}
        </div>
        <div className="relative w-32 flex flex-col items-center justify-center">
          <div className="h-1 w-full bg-slate-700 rounded absolute top-1/2 -translate-y-1/2 z-0"></div>
          <div className={`relative z-10 w-12 h-12 bg-purple-900 border-2 border-purple-500 rounded-lg flex items-center justify-center transition-all ${status === 'converting' ? 'scale-110 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : ''}`}>
             <RefreshCw className={`text-purple-200 w-5 h-5 ${status === 'converting' ? 'animate-spin' : ''}`}/>
          </div>
          {status === 'converting' && <span className="absolute -top-6 text-[10px] text-purple-400 font-bold animate-pulse">Adapting...</span>}
        </div>
        <div className="flex flex-col items-center">
           <div className="w-24 h-24 bg-slate-800 border border-green-500 rounded-lg flex flex-col items-center justify-center shadow-md relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full bg-green-900/30 border-b border-green-500/30 py-0.5 text-[8px] text-center text-green-200">React App</div>
             <FileJson className="text-green-400 mb-1" size={24}/>
             <span className="text-[10px] font-bold text-green-200">JSON Data</span>
           </div>
           {status === 'done' && <div className="text-[8px] font-mono text-green-400 mt-2 animate-fade-in">{`{ "user": { "id": 1 } }`}</div>}
        </div>
      </div>
      <button onClick={run} disabled={status !== 'idle'} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded shadow-lg disabled:opacity-50">
        Simulate Request
      </button>
    </div>
  );
};

const DecoratorSim = () => {
  const [layers, setLayers] = useState({ encrypt: true, compress: true });
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    setProcessing(true);
    const t = setTimeout(() => setProcessing(false), 300);
    return () => clearTimeout(t);
  }, [layers]);
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Toggle buttons to wrap data in new layers
      </div>
      <div className="flex items-center gap-6 mt-4">
         <div className="flex flex-col items-center gap-1">
            <div className="px-3 py-2 bg-slate-700 border border-slate-500 rounded text-xs font-mono text-white">data</div>
            <span className="text-[10px] text-slate-400">Original</span>
         </div>
         <ArrowRight className="text-slate-500" size={20}/>
         <div className="flex items-center gap-4">
            <div className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all ${layers.compress ? 'border-orange-500 bg-orange-900/40' : 'border-slate-600 bg-slate-900/40 opacity-60'}`}>
                <Box size={28} className={layers.compress ? "text-orange-400" : "text-slate-600"} />
                <span className={`absolute -bottom-6 text-[11px] font-bold ${layers.compress ? 'text-orange-400' : 'text-slate-500'}`}>ZIP</span>
            </div>
            <div className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all ${layers.encrypt ? 'border-blue-500 bg-blue-900/40' : 'border-slate-600 bg-slate-900/40 opacity-60'}`}>
                <Lock size={28} className={layers.encrypt ? "text-blue-400" : "text-slate-600"} />
                <span className={`absolute -bottom-6 text-[11px] font-bold ${layers.encrypt ? 'text-blue-400' : 'text-slate-500'}`}>AES</span>
            </div>
         </div>
         <ArrowRight className="text-slate-500" size={20}/>
         <div className="flex flex-col items-center gap-1">
            <div className={`px-3 py-2 bg-slate-800 border border-slate-600 rounded text-xs font-mono w-32 text-center transition-colors ${processing ? 'text-white' : 'text-green-400'}`}>
               "{layers.compress ? '%' : ''}{layers.encrypt ? '#' : ''}data"
            </div>
            <span className="text-[10px] text-slate-400">Final</span>
         </div>
      </div>
      <div className="flex gap-4 mt-4">
         <button onClick={() => setLayers(p => ({...p, compress: !p.compress}))} className={`px-5 py-2 rounded font-bold transition-all text-sm ${layers.compress ? 'bg-orange-600 border-2 border-orange-500 text-white hover:bg-orange-700' : 'bg-slate-700 border-2 border-slate-600 text-slate-300 hover:bg-slate-600'}`}>
            {layers.compress ? 'Remove' : 'Add'} Compression
         </button>
         <button onClick={() => setLayers(p => ({...p, encrypt: !p.encrypt}))} className={`px-5 py-2 rounded font-bold transition-all text-sm ${layers.encrypt ? 'bg-blue-600 border-2 border-blue-500 text-white hover:bg-blue-700' : 'bg-slate-700 border-2 border-slate-600 text-slate-300 hover:bg-slate-600'}`}>
            {layers.encrypt ? 'Remove' : 'Add'} Encryption
         </button>
      </div>
    </div>
  );
};

const FacadeSim = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const addLog = (msg: string) => setLogs(p => [...p, msg]);
  const run = async () => {
    setBusy(true);
    setLogs([]);
    addLog("> Initializing deployment...");
    await new Promise(r => setTimeout(r, 500));
    addLog("> Compiling assets (Webpack)...");
    await new Promise(r => setTimeout(r, 800));
    addLog("> Running tests (Jest)... PASS");
    await new Promise(r => setTimeout(r, 600));
    addLog("> Uploading to S3...");
    await new Promise(r => setTimeout(r, 600));
    addLog("> CloudFront Invalidation...");
    await new Promise(r => setTimeout(r, 400));
    addLog("> DEPLOYMENT SUCCESSFUL ✅");
    setBusy(false);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Click DEPLOY to trigger complex subsystem logic
      </div>
       <div className="flex items-center gap-8 w-full max-w-2xl mt-4">
         <div className="flex flex-col items-center gap-2">
           <button onClick={run} disabled={busy} className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 shadow-xl flex flex-col items-center justify-center hover:border-blue-500 active:scale-95 transition-all group z-10">
               <Zap size={28} className={`mb-1 transition-colors ${busy ? 'text-yellow-400 animate-pulse' : 'text-slate-500 group-hover:text-blue-400'}`} />
               <span className="text-xs font-bold text-white tracking-widest">DEPLOY</span>
           </button>
           <span className="text-xs font-bold text-slate-500 uppercase">Facade</span>
         </div>
         <ArrowRight className="text-slate-600"/>
         <div className="flex-1 h-52 bg-black border border-slate-700 rounded-lg p-4 font-mono text-xs text-green-400 overflow-y-auto custom-scroll shadow-inner">
            {logs.length === 0 && <span className="text-slate-600 opacity-50">System Idle... Waiting for trigger.</span>}
            {logs.map((l, i) => <div key={i} className="mb-1 animate-slide-up">{l}</div>)}
            {busy && <span className="animate-blink">_</span>}
         </div>
       </div>
    </div>
  );
};

const ProxySim = () => {
  const [blocked, setBlocked] = useState(false);
  const [reqs, setReqs] = useState<Array<{ id: number; status: string }>>([]);
  const [timestamps, setTimestamps] = useState<number[]>([]);
  const send = () => {
    const now = Date.now();
    const recent = timestamps.filter(t => now - t < 2000);
    setTimestamps([...recent, now]);
    if (recent.length >= 3) {
      setBlocked(true);
      setReqs(p => [{ id: now, status: 'blocked' }, ...p].slice(0, 5));
      setTimeout(() => setBlocked(false), 500);
    } else {
      setReqs(p => [{ id: now, status: 'ok' }, ...p].slice(0, 5));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Try clicking fast (3x/2s) to trigger rate limit!
      </div>
       <div className="flex items-center gap-8 w-full justify-center mt-4">
         <div className="flex flex-col items-center gap-3">
            <Smartphone size={28} className="text-slate-300"/>
            <button onClick={send} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded shadow active:scale-95">Send Req</button>
         </div>
         <div className={`w-36 h-36 border-2 rounded-xl flex flex-col items-center justify-center transition-all bg-slate-900 relative ${blocked ? 'border-red-500 text-red-500 shadow-red-500/20' : 'border-blue-500 text-blue-500'}`}>
            <div className="absolute -top-3 bg-slate-900 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">Firewall</div>
            <ShieldCheck size={32} className="mb-2"/>
            <span className="text-xs font-bold">PROXY</span>
            <span className="text-xs opacity-80 mt-2 bg-slate-800 px-1 rounded">Limit: 3/2s</span>
         </div>
         <div className="w-48 h-40 bg-slate-950 border border-slate-800 rounded p-3 overflow-y-auto custom-scroll">
            <div className="text-xs text-slate-500 uppercase font-bold mb-3 border-b border-slate-800">Request Log</div>
            {reqs.map(r => (
              <div key={r.id} className={`flex items-center gap-2 text-xs mb-2 animate-slide-up ${r.status === 'blocked' ? 'text-red-400' : 'text-green-400'}`}>
                {r.status === 'blocked' ? <X size={10}/> : <Check size={10}/>}
                <span>{r.status === 'blocked' ? '429 Blocked' : '200 OK'}</span>
              </div>
            ))}
         </div>
       </div>
    </div>
  );
};

const ObserverSim = () => {
  const [data, setData] = useState({ cpu: 10, ram: 20 });
  const update = () => {
    setData({
      cpu: Math.floor(Math.random() * 80) + 10,
      ram: Math.floor(Math.random() * 60) + 20
    });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Click Update to notify all observers instantly
      </div>
       <div className="relative mt-4">
         <button onClick={update} className="w-20 h-20 rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg flex flex-col items-center justify-center z-10 relative active:scale-95 border-2 border-blue-500">
             <Server size={24} className="text-blue-400 mb-1"/>
             <span className="text-[8px] font-bold uppercase text-slate-400">Subject</span>
             <span className="text-[10px] font-bold">Update</span>
         </button>
         <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-pulse-ring"></div>
       </div>
       <div className="flex gap-4 w-full justify-center">
         <div className="w-28 h-24 bg-slate-900 border border-slate-700 rounded-lg p-2 flex flex-col items-center justify-between shadow-md">
             <span className="text-[8px] text-slate-500 font-bold uppercase w-full text-center border-b border-slate-800 pb-1">CPU Monitor</span>
             <div className="flex items-end gap-1 h-12 w-full justify-center pb-1">
                <div className="w-3 bg-blue-500 transition-all duration-300" style={{ height: `${data.cpu}%` }}></div>
                <div className="w-3 bg-blue-500/50 transition-all duration-300" style={{ height: `${data.cpu * 0.7}%` }}></div>
                <div className="w-3 bg-blue-500/30 transition-all duration-300" style={{ height: `${data.cpu * 0.4}%` }}></div>
             </div>
             <span className="text-[10px] font-mono text-blue-300">{data.cpu}%</span>
         </div>
         <div className="w-28 h-24 bg-slate-900 border border-slate-700 rounded-lg p-2 flex flex-col shadow-md">
             <span className="text-[8px] text-slate-500 font-bold uppercase w-full text-center border-b border-slate-800 pb-1">Log Stream</span>
             <div className="flex-1 overflow-hidden text-[8px] font-mono text-green-400 pt-1 leading-tight">
                <div className="opacity-50">sys.chk OK</div>
                <div className="animate-slide-up">ram: {data.ram}GB</div>
                <div className="animate-slide-up">cpu: {data.cpu}%</div>
             </div>
         </div>
          <div className={`w-28 h-24 border rounded-lg p-2 flex flex-col items-center justify-center shadow-md transition-colors duration-300 ${data.cpu > 70 ? 'bg-red-900/20 border-red-500' : 'bg-slate-900 border-slate-700'}`}>
             <span className="text-[8px] text-slate-500 font-bold uppercase w-full text-center border-b border-slate-800 pb-1 mb-2">Alert System</span>
             {data.cpu > 70 ? <AlertTriangle className="text-red-500 animate-pulse" size={24}/> : <CheckCircle className="text-green-500" size={24}/>}
             <span className={`text-[10px] font-bold mt-1 ${data.cpu > 70 ? 'text-red-400' : 'text-green-400'}`}>{data.cpu > 70 ? 'HIGH LOAD' : 'NORMAL'}</span>
         </div>
       </div>
    </div>
  );
};

const CommandSim = () => {
  const [balance, setBalance] = useState(1000);
  const [history, setHistory] = useState<Array<{ op: string; val: number }>>([]);
  const exec = (amount: number) => {
    setBalance(p => p + amount);
    setHistory(p => [...p, { op: amount > 0 ? 'Deposit' : 'Withdraw', val: amount }]);
  };
  const undo = () => {
    if(history.length === 0) return;
    const last = history[history.length - 1];
    setBalance(p => p - last.val);
    setHistory(p => p.slice(0, -1));
  };
  return (
    <div className="flex flex-col items-center p-6 gap-8 bg-slate-900 min-h-[450px] relative">
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Make transactions, then click Undo to revert
      </div>
       <div className="w-full max-w-sm bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl flex items-center justify-between mt-4">
         <div>
           <div className="text-xs font-bold text-slate-500 uppercase">Current Balance</div>
           <div className="text-4xl font-mono font-bold text-white">${balance}</div>
         </div>
         <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
             <CreditCard className="text-slate-400" size={24}/>
         </div>
       </div>
       <div className="flex gap-2">
         <button onClick={() => exec(100)} className="px-4 py-2 bg-green-900/30 border border-green-500/50 text-green-300 text-xs font-bold rounded hover:bg-green-900/50 transition-colors">+ $100</button>
         <button onClick={() => exec(-50)} className="px-4 py-2 bg-red-900/30 border border-red-500/50 text-red-300 text-xs font-bold rounded hover:bg-red-900/50 transition-colors">- $50</button>
         <button onClick={undo} disabled={history.length === 0} className="ml-4 px-4 py-2 bg-slate-700 border border-slate-600 text-white text-xs font-bold rounded flex items-center gap-1 hover:bg-slate-600 disabled:opacity-50">
             <RotateCcw size={12}/> Undo
         </button>
       </div>
       <div className="w-full max-w-sm flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-y-auto custom-scroll h-32">
         <div className="text-[10px] text-slate-500 font-bold uppercase mb-2 border-b border-slate-800 pb-1">Transaction Log</div>
         {history.length === 0 && <div className="text-[10px] text-slate-600 italic">No transactions</div>}
         {history.map((h, i) => (
             <div key={i} className="flex justify-between text-[10px] font-mono mb-1 animate-slide-up border-b border-slate-900 pb-1">
                <span className="text-slate-300">{h.op}</span>
                <span className={h.val > 0 ? "text-green-400" : "text-red-400"}>{h.val > 0 ? '+' : ''}{h.val}</span>
             </div>
         ))}
       </div>
    </div>
  );
};

const StateSim = () => {
  const [state, setState] = useState('CLOSED');
  useEffect(() => {
    let t: number | undefined;
    if(state === 'SYN_SENT') t = setTimeout(() => setState('ESTABLISHED'), 1500);
    return () => clearTimeout(t);
  }, [state]);
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Trigger events to transition state
      </div>
       <div className="flex items-center gap-8 mt-4">
         <div className="flex flex-col items-center gap-2">
             <div className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center transition-all ${state === 'ESTABLISHED' ? 'border-green-500 bg-green-900/20' : 'border-slate-600 bg-slate-800'}`}>
                <Monitor className={state === 'ESTABLISHED' ? "text-green-400" : "text-slate-500"} size={24}/>
             </div>
             <span className="text-[10px] font-bold text-slate-500">CLIENT</span>
         </div>
         <div className="relative w-40 h-1 bg-slate-800 rounded">
             <div className={`absolute top-0 left-0 h-full bg-green-500 transition-all duration-1000 ${state === 'CLOSED' ? 'w-0' : state === 'SYN_SENT' ? 'w-1/2' : 'w-full'}`}></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[8px] font-mono text-yellow-400">
               {state}
             </div>
         </div>
         <div className="flex flex-col items-center gap-2">
             <div className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center transition-all ${state === 'ESTABLISHED' ? 'border-green-500 bg-green-900/20' : 'border-slate-600 bg-slate-800'}`}>
                <Server className={state === 'ESTABLISHED' ? "text-green-400" : "text-slate-500"} size={24}/>
             </div>
             <span className="text-[10px] font-bold text-slate-500">SERVER</span>
         </div>
       </div>
       <div className="flex gap-4">
         <button onClick={() => setState('SYN_SENT')} disabled={state !== 'CLOSED'} className="px-4 py-2 bg-blue-600 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-bold rounded">1. Connect (SYN)</button>
         <button onClick={() => setState('FIN_WAIT')} disabled={state !== 'ESTABLISHED'} className="px-4 py-2 bg-red-600 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-bold rounded">2. Close (FIN)</button>
         <button onClick={() => setState('CLOSED')} className="px-4 py-2 border border-slate-600 text-slate-400 text-xs font-bold rounded hover:bg-slate-800">Reset</button>
       </div>
    </div>
  );
};

// ============================================================================
// --- NEW SIMULATIONS (FOR MISSING PATTERNS) ---
// ============================================================================

const AbstractFactorySim = () => {
  const [theme, setTheme] = useState('dark');
   
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Switch Theme Factory to change UI families
      </div>

      <div className="flex gap-4 mb-4">
        <button onClick={() => setTheme('dark')} className={`px-4 py-2 rounded text-xs font-bold border transition-all ${theme === 'dark' ? 'bg-slate-800 border-blue-500 text-white' : 'border-slate-600 text-slate-500'}`}>Dark Factory</button>
        <button onClick={() => setTheme('light')} className={`px-4 py-2 rounded text-xs font-bold border transition-all ${theme === 'light' ? 'bg-gray-200 border-blue-500 text-black' : 'border-slate-600 text-slate-500'}`}>Light Factory</button>
      </div>

      <div className={`w-64 p-6 rounded-xl border-2 transition-all duration-500 flex flex-col gap-4 shadow-2xl ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
         <div className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>App Window</div>
         
         {/* Product A: Button */}
         <button className={`w-full py-2 rounded font-bold transition-all ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}>
            {theme === 'dark' ? 'Dark Button' : 'Light Button'}
         </button>

         {/* Product B: Checkbox */}
         <div className={`flex items-center gap-3 p-3 rounded border ${theme === 'dark' ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-gray-200 bg-gray-50 text-gray-700'}`}>
            <div className={`w-4 h-4 rounded border flex items-center justify-center ${theme === 'dark' ? 'border-blue-500 bg-blue-500/20' : 'border-blue-500 bg-white'}`}>
              <Check size={10} className="text-blue-500"/>
            </div>
            <span className="text-xs">Checkbox Style</span>
         </div>
      </div>
    </div>
  )
}

// --- NEW BRIDGE SIMULATION: DATABASE DRIVERS ---
const BridgeSim = () => {
  const [dbType, setDbType] = useState('SQL'); // 'SQL' or 'Mongo'
  const [query, setQuery] = useState('');
   
  const saveUser = (name: any) => {
     if(dbType === 'SQL') {
       setQuery(`INSERT INTO users (name) VALUES ('${name}');`);
     } else {
       setQuery(`db.collection('users').insertOne({ name: '${name}' });`);
     }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Abstraction (Repo) uses Implementation (Driver)
      </div>

      <div className="flex items-center gap-8 w-full max-w-2xl">
         {/* Abstraction: Repository */}
         <div className="w-1/3 bg-slate-800 border border-slate-600 rounded-xl p-4 shadow-xl flex flex-col gap-3">
            <span className="text-[10px] uppercase font-bold text-slate-500">User Repository</span>
            <div className="flex flex-col gap-2">
               <input type="text" placeholder="New User Name" className="bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white" id="userNameInput" />
               <button onClick={() => saveUser((document.getElementById('userNameInput') as HTMLInputElement)?.value || 'Alice')} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded">
                  repo.saveUser()
               </button>
            </div>
         </div>

         {/* Bridge */}
         <div className="flex flex-col items-center gap-1">
            <div className="h-1 w-12 bg-slate-700"></div>
            <span className="text-[8px] uppercase font-bold text-slate-500">Bridge</span>
         </div>

         {/* Implementation: Driver */}
         <div className="w-1/3 flex flex-col gap-3">
             <div className="flex gap-2 bg-slate-900 p-1 rounded border border-slate-700">
                <button onClick={() => setDbType('SQL')} className={`flex-1 py-1 text-[10px] font-bold rounded ${dbType === 'SQL' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>SQL Driver</button>
                <button onClick={() => setDbType('Mongo')} className={`flex-1 py-1 text-[10px] font-bold rounded ${dbType === 'Mongo' ? 'bg-green-600 text-white' : 'text-slate-500 hover:text-white'}`}>Mongo Driver</button>
             </div>
             
             <div className="bg-black border border-slate-700 rounded-xl p-4 h-32 font-mono text-[10px] text-green-400 overflow-hidden relative shadow-inner flex items-center justify-center text-center">
                 {query || <span className="text-slate-600 italic">// Waiting for query...</span>}
                 {query && <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>}
             </div>
         </div>
      </div>
    </div>
  )
}

const CompositeSim = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ root: true, music: true });
  const toggle = (k: string) => setExpanded(p => ({...p, [k]: !p[k]}));
   
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Folders & Files treated uniformly
      </div>

      <div className="w-64 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
         <div className="text-xs font-bold text-slate-500 uppercase mb-4 border-b border-slate-800 pb-2 flex justify-between">
           <span>File Explorer</span>
           <span>Total: 450MB</span>
         </div>
         
         <div className="font-mono text-xs text-slate-300 space-y-1">
            {/* Root Folder */}
            <div>
               <div onClick={() => toggle('root')} className="flex items-center gap-2 cursor-pointer hover:text-white">
                 <div className="w-3">{expanded.root ? '▼' : '▶'}</div>
                 <Box size={14} className="text-blue-400"/>
                 <span>Root (450MB)</span>
               </div>
               
               {expanded.root && (
                 <div className="pl-6 space-y-1 border-l border-slate-700 ml-1.5 mt-1">
                    {/* File 1 */}
                    <div className="flex items-center gap-2 text-slate-400">
                       <FileText size={14}/>
                       <span>resume.pdf (2MB)</span>
                    </div>

                    {/* Sub Folder */}
                    <div>
                       <div onClick={() => toggle('music')} className="flex items-center gap-2 cursor-pointer hover:text-white">
                         <div className="w-3">{expanded.music ? '▼' : '▶'}</div>
                         <Box size={14} className="text-yellow-400"/>
                         <span>Music (448MB)</span>
                       </div>
                       
                       {expanded.music && (
                          <div className="pl-6 space-y-1 border-l border-slate-700 ml-1.5 mt-1">
                             <div className="flex items-center gap-2 text-slate-400">
                                <FileJson size={14}/>
                                <span>track1.mp3 (10MB)</span>
                             </div>
                              <div className="flex items-center gap-2 text-slate-400">
                                <FileJson size={14}/>
                                <span>mix.wav (438MB)</span>
                             </div>
                          </div>
                       )}
                    </div>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  )
}

const FlyweightSim = () => {
  const [particleCount, setParticleCount] = useState(50);
  // Shared state simulation (The 'Flyweight')
  const sharedTexture = "🌟"; 
   
  // Unique state simulation (The Context)
  const particles = Array(particleCount).fill(0).map((_, i) => ({
    id: i,
    x: Math.sin(i) * 40 + 50,
    y: Math.cos(i) * 40 + 50,
    scale: 0.5 + Math.random()
  }));

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Increase particles without exploding RAM
      </div>

      <div className="relative w-64 h-64 bg-slate-900 rounded-full border border-slate-700 overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
         {particles.map(p => (
           <div key={p.id} className="absolute text-yellow-200 transition-all duration-1000" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `scale(${p.scale})` }}>
             {sharedTexture}
           </div>
         ))}
         <div className="absolute bottom-4 left-0 w-full text-center text-[10px] font-mono text-slate-400">
            {particleCount} Particles Rendered
         </div>
      </div>

      <div className="flex gap-4 items-center">
         <button onClick={() => setParticleCount(Math.min(300, particleCount + 50))} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-xs font-bold text-white">Add 50 Particles</button>
         <div className="flex flex-col text-[10px] text-slate-400">
            <span>RAM Used: <span className="text-green-400">low</span></span>
            <span>Texture instances: <span className="text-green-400">1</span></span>
         </div>
      </div>
    </div>
  )
}

const ChainSim = () => {
  const [log, setLog] = useState<Array<{ agent: string; status: string }>>([]);
  const handle = (level: number) => {
    setLog([]);
    const steps: Array<{ agent: string; status: string }> = [];
    steps.push({ agent: 'Bot', status: level === 1 ? 'SOLVED' : 'PASSED' });
    if (level > 1) steps.push({ agent: 'Junior', status: level === 2 ? 'SOLVED' : 'PASSED' });
    if (level > 2) steps.push({ agent: 'Senior', status: 'SOLVED' });
     
    // Animate
    steps.forEach((s, i) => {
      setTimeout(() => setLog(prev => [...prev, s]), i * 800);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Send requests of varying difficulty
      </div>

      <div className="flex gap-3">
        <button onClick={() => handle(1)} className="px-3 py-1 bg-green-900/30 border border-green-500/50 text-green-300 text-[10px] rounded hover:bg-green-900/50">Simple Query</button>
        <button onClick={() => handle(2)} className="px-3 py-1 bg-yellow-900/30 border border-yellow-500/50 text-yellow-300 text-[10px] rounded hover:bg-yellow-900/50">Complex Query</button>
        <button onClick={() => handle(3)} className="px-3 py-1 bg-red-900/30 border border-red-500/50 text-red-300 text-[10px] rounded hover:bg-red-900/50">Critical Bug</button>
      </div>

      <div className="flex flex-col gap-4 w-64">
        {log.map((step, i) => (
           <div key={i} className="flex items-center gap-3 animate-slide-up">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.status === 'SOLVED' ? 'border-green-500 bg-green-900/20 text-green-400' : 'border-slate-600 bg-slate-800 text-slate-500'}`}>
                 <Users size={16}/>
              </div>
              <div className="flex-1 text-xs">
                 <div className="font-bold text-white">{step.agent} Agent</div>
                 <div className={step.status === 'SOLVED' ? 'text-green-400' : 'text-slate-500'}>{step.status === 'SOLVED' ? 'Resolved Ticket ✅' : 'Escalated ⬆️'}</div>
              </div>
           </div>
        ))}
         {log.length === 0 && <div className="text-center text-slate-600 text-xs italic mt-4">Waiting for ticket...</div>}
      </div>
    </div>
  )
}

const IteratorSim = () => {
  const songs = ["Track 1", "Track 2", "Track 3", "Track 4"];
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % songs.length);
  const prev = () => setIndex((index - 1 + songs.length) % songs.length);

  return (
     <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Iterate through collection abstractly
      </div>

       <div className="w-64 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
          <div className="text-xs font-bold text-slate-500 uppercase mb-4 text-center">Playlist Iterator</div>
          <div className="space-y-2 mb-6">
             {songs.map((s, i) => (
                <div key={i} className={`p-2 rounded text-xs transition-all flex justify-between ${i === index ? 'bg-blue-600 text-white font-bold pl-4' : 'bg-slate-800 text-slate-400'}`}>
                   <span>{s}</span>
                   {i === index && <Activity size={14} className="animate-pulse"/>}
                </div>
             ))}
          </div>
          <div className="flex justify-between">
             <button onClick={prev} className="p-2 bg-slate-800 hover:bg-slate-700 rounded border border-slate-600 text-white"><SkipBack size={16}/></button>
             <button onClick={next} className="p-2 bg-slate-800 hover:bg-slate-700 rounded border border-slate-600 text-white"><ArrowRight size={16}/></button>
          </div>
       </div>
     </div>
  )
}

const MediatorSim = () => {
  const [msgs, setMsgs] = useState<Array<{ user: string; text: string; id: number }>>([]);
  const send = (user: string, text: string) => {
    setMsgs(p => [...p, { user, text, id: Date.now() }].slice(-4));
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Users talk to Hub, not each other
      </div>

       {/* Mediator Hub */}
       <div className="relative w-24 h-24 rounded-full border-4 border-slate-700 flex items-center justify-center bg-slate-900 z-10">
          <Share2 size={32} className="text-slate-500"/>
          <span className="absolute -bottom-6 text-[10px] font-bold text-slate-500 uppercase">Hub</span>
       </div>

       {/* Users */}
       <div className="flex w-full max-w-md justify-between px-4 absolute top-1/2 -translate-y-1/2">
          <button onClick={() => send('Alice', 'Hello!')} className="flex flex-col items-center gap-2 group">
             <div className="w-12 h-12 bg-blue-900/50 border border-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
               <span className="text-xs font-bold text-blue-200">A</span>
             </div>
             <span className="text-[10px] text-blue-400">Alice</span>
          </button>

          <button onClick={() => send('Bob', 'Hi!')} className="flex flex-col items-center gap-2 group">
             <div className="w-12 h-12 bg-green-900/50 border border-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
               <span className="text-xs font-bold text-green-200">B</span>
             </div>
             <span className="text-[10px] text-green-400">Bob</span>
          </button>
       </div>

       {/* Chat Log */}
       <div className="mt-16 w-64 h-32 bg-slate-950 border border-slate-800 rounded p-3 overflow-y-auto custom-scroll">
          {msgs.length === 0 && <span className="text-slate-600 text-[10px] italic">No messages routed...</span>}
          {msgs.map(m => (
             <div key={m.id} className="text-[10px] mb-1 animate-slide-up">
                <span className={m.user === 'Alice' ? 'text-blue-400 font-bold' : 'text-green-400 font-bold'}>{m.user}: </span>
                <span className="text-slate-300">{m.text}</span>
             </div>
          ))}
       </div>
    </div>
  )
}

const MementoSim = () => {
  const [text, setText] = useState("Version 1");
  const [saves, setSaves] = useState<string[]>([]);
   
  const save = () => setSaves(p => [...p, text]);
  const restore = (val: React.SetStateAction<string>) => setText(val);

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Save state snapshots and restore them
      </div>

       <div className="flex gap-8 items-start w-full max-w-md">
          <div className="flex-1 flex flex-col gap-2">
             <span className="text-xs font-bold text-slate-500 uppercase">Editor</span>
             <input value={text} onChange={(e) => setText(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white focus:border-blue-500 outline-none"/>
             <button onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white py-1 rounded text-xs font-bold">Save Snapshot</button>
          </div>

          <div className="w-32 flex flex-col gap-2">
             <span className="text-xs font-bold text-slate-500 uppercase">History</span>
             <div className="flex flex-col gap-1">
               {saves.map((s, i) => (
                  <button key={i} onClick={() => restore(s)} className="text-left px-2 py-1 bg-slate-800 border border-slate-700 hover:border-green-500 rounded text-[10px] text-slate-300 truncate transition-colors">
                     {i+1}. {s}
                  </button>
               ))}
               {saves.length === 0 && <span className="text-[10px] text-slate-600 italic">Empty</span>}
             </div>
          </div>
       </div>
    </div>
  )
}

// --- NEW TEMPLATE METHOD SIMULATION: CI/CD PIPELINE ---
const TemplateSim = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [type, setType] = useState('Node'); // Node or Java
  const [running, setRunning] = useState(false);

  const addLog = (msg: string) => setLogs(p => [...p, msg]);

  const runPipeline = async () => {
    if(running) return;
    setRunning(true);
    setLogs([]);
    
    // Abstract Step 1
    addLog("[Common] Cloning Repository...");
    await new Promise(r => setTimeout(r, 600));
    
    // Subclass Step 2 (Install)
    if(type === 'Node') addLog("[Node] npm install");
    else addLog("[Java] mvn install");
    await new Promise(r => setTimeout(r, 800));

    // Subclass Step 3 (Build)
    if(type === 'Node') addLog("[Node] npm run build (Webpack)");
    else addLog("[Java] mvn package (JAR)");
    await new Promise(r => setTimeout(r, 800));

    // Abstract Step 4
    addLog("[Common] Running Unit Tests...");
    await new Promise(r => setTimeout(r, 600));

    addLog(`[System] ${type} Pipeline Complete ✅`);
    setRunning(false);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Same Structure, Different Commands
      </div>

      <div className="flex gap-4">
        <button onClick={() => setType('Node')} className={`flex items-center gap-2 px-4 py-2 rounded border text-xs font-bold transition-all ${type === 'Node' ? 'bg-green-900 border-green-500 text-white' : 'border-slate-700 text-slate-500'}`}>
          <FileCode size={14}/> Node.js Pipeline
        </button>
        <button onClick={() => setType('Java')} className={`flex items-center gap-2 px-4 py-2 rounded border text-xs font-bold transition-all ${type === 'Java' ? 'bg-orange-900 border-orange-500 text-white' : 'border-slate-700 text-slate-500'}`}>
          <FileText size={14}/> Java Pipeline
        </button>
      </div>

      <div className="w-full max-w-md bg-black border border-slate-700 rounded-lg p-4 font-mono text-[11px] text-slate-300 h-48 overflow-y-auto custom-scroll shadow-inner">
         <div className="text-slate-500 mb-2 border-b border-slate-800 pb-1 flex justify-between">
           <span>Terminal Output</span>
           {running && <span className="text-blue-400 animate-pulse">Running...</span>}
         </div>
         {logs.map((l, i) => <div key={i} className="mb-1 animate-slide-up">{l}</div>)}
         {logs.length === 0 && <span className="text-slate-600 italic">// Ready to build...</span>}
      </div>
       
      <button onClick={runPipeline} disabled={running} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded shadow disabled:opacity-50">
        Run {type} Pipeline
      </button>
    </div>
  )
}

// --- NEW STRATEGY SIMULATION: LOAD BALANCER ---
const StrategySim = () => {
  const [strategy, setStrategy] = useState('RoundRobin');
  const [servers, setServers] = useState([
     { id: 1, reqs: 0, active: true },
     { id: 2, reqs: 0, active: true },
     { id: 3, reqs: 0, active: true }
  ]);
  const [lastIdx, setLastIdx] = useState(-1);

  const sendRequest = () => {
    setServers(prev => {
      const newServers = [...prev];
      let targetIdx = 0;

      // STRATEGY LOGIC
      if(strategy === 'RoundRobin') {
        targetIdx = (lastIdx + 1) % newServers.length;
        setLastIdx(targetIdx);
      } 
      else if(strategy === 'Random') {
        targetIdx = Math.floor(Math.random() * newServers.length);
      }
      else if(strategy === 'LeastConn') {
        // Find server with min requests
        targetIdx = newServers.reduce((minIdx, curr, idx, arr) => 
            curr.reqs < arr[minIdx].reqs ? idx : minIdx, 0);
      }

      newServers[targetIdx].reqs += 1;
      return newServers;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Switch algorithms to route traffic
      </div>
       
       {/* Strategy Selector */}
       <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-700">
         {['RoundRobin', 'Random', 'LeastConn'].map(s => (
           <button key={s} onClick={() => setStrategy(s)} className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${strategy === s ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
             {s}
           </button>
         ))}
       </div>

       {/* Client */}
       <div className="flex flex-col items-center gap-4">
          <button onClick={sendRequest} className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform active:scale-95">
             <Globe size={18}/> Send Traffic
          </button>
          <ArrowDown className="text-slate-500 animate-bounce" size={20}/>
       </div>

       {/* Load Balancer Visualization */}
       <div className="flex gap-6 items-end h-32">
          {servers.map(s => (
             <div key={s.id} className="flex flex-col items-center gap-2 w-16 group">
                <div className="text-[10px] font-mono text-slate-400">{s.reqs} reqs</div>
                <div className="w-full bg-slate-800 rounded-t-lg relative overflow-hidden transition-all duration-300 border-2 border-slate-700 group-hover:border-blue-500" style={{ height: `${Math.min(100, s.reqs * 5 + 20)}%` }}>
                   <div className="absolute bottom-0 left-0 w-full bg-blue-500/30 transition-all duration-300" style={{ height: `${Math.min(100, s.reqs * 5)}%` }}></div>
                </div>
                <div className="w-full h-1 bg-slate-600 rounded"></div>
                <span className="text-[10px] font-bold text-slate-500">Srv-{s.id}</span>
             </div>
          ))}
       </div>
    </div>
  );
};

const VisitorSim = () => {
  const [result, setResult] = useState('');
   
  const shapes = [
    { type: 'Circle', id: 1 },
    { type: 'Square', id: 2 },
    { type: 'Triangle', id: 3 }
  ];

  const visitXml = () => {
     const xml = shapes.map(s => `<${s.type} id="${s.id}" />`).join('\n');
     setResult(xml);
  }

  const visitJson = () => {
     const json = JSON.stringify(shapes, null, 2);
     setResult(json);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 min-h-[450px] relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-300 font-mono animate-hint flex items-center gap-1">
        <MousePointerClick size={12} /> Apply new operations (Export) to objects
      </div>

      <div className="flex gap-8 w-full max-w-xl">
         {/* Object Structure */}
         <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Shapes</span>
            {shapes.map(s => (
               <div key={s.id} className="w-24 p-2 bg-slate-800 border border-slate-600 rounded text-center text-xs text-slate-300">
                  {s.type}
               </div>
            ))}
         </div>
         
         {/* Visitor Controls */}
         <div className="flex flex-col gap-2 justify-center">
            <button onClick={visitXml} className="px-4 py-2 bg-blue-900/40 border border-blue-500 text-blue-300 text-xs font-bold rounded hover:bg-blue-900/60">XML Visitor</button>
            <button onClick={visitJson} className="px-4 py-2 bg-green-900/40 border border-green-500 text-green-300 text-xs font-bold rounded hover:bg-green-900/60">JSON Visitor</button>
         </div>

         {/* Result */}
         <div className="flex-1 h-32 bg-black border border-slate-700 rounded p-3 font-mono text-[10px] text-yellow-100 overflow-y-auto custom-scroll whitespace-pre">
            {result || "// Click a visitor to export..."}
         </div>
      </div>
    </div>
  )
}

// ============================================================================
// --- MAIN LAYOUT COMPONENT ---
// ============================================================================
export default function DesignPatternEncyclopedia() {
  const [active, setActive] = useState<keyof typeof PATTERNS>('singleton');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for collapsible categories - initialized to true (open) for discovery
  const [expandedCats, setExpandedCats] = useState({
    Creational: true,
    Structural: true,
    Behavioral: true
  });

  const toggleCat = (cat: 'Creational' | 'Structural' | 'Behavioral') => {
    setExpandedCats(prev => ({...prev, [cat]: !prev[cat]}));
  };

  const info = PATTERNS[active];
   
  const SIMS = {
    // Creational
    singleton: SingletonSim, factory: FactorySim, abstract_factory: AbstractFactorySim, 
    builder: BuilderSim, prototype: PrototypeSim,
    // Structural
    adapter: AdapterSim, bridge: BridgeSim, composite: CompositeSim, 
    decorator: DecoratorSim, facade: FacadeSim, flyweight: FlyweightSim, proxy: ProxySim,
    // Behavioral
    chain_of_responsibility: ChainSim, command: CommandSim, iterator: IteratorSim, 
    mediator: MediatorSim, memento: MementoSim, observer: ObserverSim, state: StateSim, 
    strategy: StrategySim, template_method: TemplateSim, visitor: VisitorSim
  };
  const ActiveSim = SIMS[active];

  return (
    <div className="flex h-screen bg-slate-950 text-white font-sans overflow-hidden select-none text-sm relative">
      <style>{styles}</style>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div className="absolute inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
           
          {/* Drawer */}
          <div className="w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl animate-slide-in-left relative z-10">
             <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-blue-500">
                   <Layers className="text-blue-400" size={20} />
                   <span className="font-extrabold text-lg text-white tracking-tight">Design Patterns</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white">
                   <X size={20} />
                </button>
             </div>
             
            <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-6">
              {(['Creational', 'Structural', 'Behavioral'] as const).map(cat => (
                 <div key={cat}>
                   <button 
                     onClick={() => toggleCat(cat)}
                     className={`w-full flex items-center justify-between py-2 text-[11px] font-black uppercase tracking-widest mb-1 px-1 transition-colors ${cat === 'Creational' ? 'text-blue-400 hover:bg-blue-900/20' : cat === 'Structural' ? 'text-purple-400 hover:bg-purple-900/20' : 'text-green-400 hover:bg-green-900/20'} rounded cursor-pointer`}
                   >
                     <span>{cat}</span>
                     {expandedCats[cat] ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
                   </button>
                   
                   {expandedCats[cat] && (
                     <div className="space-y-1.5 pl-2 animate-fade-in">
                       {Object.entries(PATTERNS).filter(([_, p]) => p.category === cat).map(([key, p]) => (
                          <button
                            key={key}
                            onClick={() => { setActive(key as keyof typeof PATTERNS); setIsSidebarOpen(false); }}
                            className={`w-full text-left px-3 py-2.5 text-xs font-bold flex items-center gap-3 transition-all duration-200 ${active === key ? 'bg-slate-800 rounded-lg text-white shadow-md border-l-4 ' + (cat === 'Creational' ? 'border-blue-500' : cat === 'Structural' ? 'border-purple-500' : 'border-green-500') : 'text-slate-400 bg-transparent hover:text-slate-200 hover:bg-slate-800/50 rounded-lg'}`}
                          >
                            <p.icon size={16} className={active === key ? (cat === 'Creational' ? 'text-blue-400' : cat === 'Structural' ? 'text-purple-400' : 'text-green-400') : 'text-slate-600'} />
                            <span>{p.title}</span>
                          </button>
                       ))}
                     </div>
                   )}
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR NAVIGATION */}
      <div className="w-80 bg-slate-900 border-r border-slate-800 flex-col z-20 hidden md:flex shadow-2xl">
        <div className="p-4 border-b border-slate-800 ">
           <div className="flex items-center gap-2 text-blue-500 mb-1">
             <Layers className="text-blue-400" size={20} />
             <span className="font-extrabold text-2xl text-white tracking-tight">Design Patterns</span>
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-6">
          {(['Creational', 'Structural', 'Behavioral'] as const).map(cat => (
             <div key={cat}>
               <button 
                 onClick={() => toggleCat(cat)}
                 className={`w-full flex bg-slate-900 items-center justify-between py-2 text-lg font-black uppercase tracking-widest mb-1 px-2 transition-colors ${cat === 'Creational' ? 'text-blue-400 hover:bg-blue-900/20' : cat === 'Structural' ? 'text-purple-400 hover:bg-purple-900/20' : 'text-green-400 hover:bg-green-900/20'} rounded cursor-pointer`}
               >
                 <span>{cat}</span>
                 {expandedCats[cat] ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
               </button>

               {expandedCats[cat] && (
                 <div className="space-y-1.5 pl-2 animate-fade-in">
                   {Object.entries(PATTERNS).filter(([_, p]) => p.category === cat).map(([key, p]) => (
                      <button
                        key={key}
                        onClick={() => setActive(key as keyof typeof PATTERNS)}
                        className={`w-full text-left px-3 py-2 text-lg font-bold flex items-center gap-3 transition-all duration-200 ${active === key ? 'bg-slate-800 rounded-lg text-white shadow-md border-l-4 ' + (cat === 'Creational' ? 'border-blue-500' : cat === 'Structural' ? 'border-purple-500' : 'border-green-500') : 'text-slate-400 bg-transparent hover:text-slate-200 hover:bg-slate-800/50 rounded-lg'}`}
                      >
                        <p.icon size={16} className={active === key ? (cat === 'Creational' ? 'text-blue-400' : cat === 'Structural' ? 'text-purple-400' : 'text-green-400') : 'text-slate-600'} />
                        <span>{p.title}</span>
                      </button>
                   ))}
                 </div>
               )}
             </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950 relative overflow-y-auto custom-scroll">
        {/* Mobile Header */}
        <div className="md:hidden p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40 shadow-lg">
           <div className="flex items-center gap-2">
             <Layers className="text-blue-500" size={20} />
             <span className="font-bold text-base">PatternLabs</span>
           </div>
           <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-md">
             <Menu size={20} />
           </button>
        </div>

        {/* Info Header - COMPACT */}
        <div className="bg-slate-900 border-b border-slate-800 p-4 z-10 shadow-lg">
           <div className="w-full">
             <div className="flex items-center gap-3 mb-2">
                 <span className={`px-2 py-0.5 text-[11px] font-black uppercase tracking-widest rounded border ${info.category === 'Creational' ? 'border-blue-700 bg-blue-900 text-blue-100' : info.category === 'Structural' ? 'border-purple-700 bg-purple-900 text-purple-100' : 'border-green-700 bg-green-900 text-green-100'}`}>
                    {info.category}
                 </span>
                 <h1 className="text-3xl font-black text-white flex items-center gap-2">
                    {info.title}
                 </h1>
             </div>
             <p className="text-base text-slate-300 mb-4 leading-relaxed font-medium">{info.what}</p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                 <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-sm">
                    <strong className="text-blue-400 block mb-2 uppercase text-[12px] font-black tracking-wider">Why?</strong>
                    <p className="text-slate-300 leading-relaxed text-sm">{info.why}</p>
                 </div>
                 <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-sm">
                    <strong className="text-purple-400 block mb-2 uppercase text-[12px] font-black tracking-wider">How?</strong>
                    <p className="text-slate-300 leading-relaxed text-sm">{info.how}</p>
                 </div>
                 <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 border-l-4 border-l-yellow-500 shadow-sm">
                    <strong className="text-yellow-500 block mb-2 uppercase text-[12px] font-black tracking-wider">Scenario</strong>
                    <p className="text-white italic font-medium leading-relaxed text-sm">{`"${info.scenario}"`}</p>
                 </div>
             </div>
           </div>
        </div>

        {/* Simulation Canvas - FULL WIDTH */}
        <div className=''>
        <div className="p-4 flex items-start justify-center ">
           <div className="w-full  bg-slate-900 border-2 border-slate-800 rounded-xl overflow-hidden shadow-2xl relative flex flex-col ">
             {/* Fake Browser Toolbar */}
             <div className="h-8 bg-slate-950 border-b border-slate-800 flex items-center px-4 gap-2 flex-shrink-0">
                 <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                 </div>
                 <div className="ml-4 px-3 py-0.5 bg-slate-900 rounded border border-slate-700 text-[10px] text-slate-400 font-mono flex items-center gap-1 flex-1 max-w-xs">
                    <Lock size={8} className="text-green-500" /> 
                    <span className="text-slate-300 truncate">simulation://{active}.sim</span>
                 </div>
             </div>
             
             {/* Simulation Content */}
             <div className="relative bg-black/50 flex-1">
                 <ActiveSim />
             </div>

           
           </div>
           
        </div>
           {/* Footer */}
              <div className="pb-4 flex items-center justify-center gap-2 flex-shrink-0">
                 <span className="text-slate-400 text-sm">Made with</span>
                 <span className="text-red-500 text-lg">❤️</span>
                 <span className="text-slate-400 text-sm">by</span>
                 <a href="https://bhaveshjadhav.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors flex items-center gap-1">
                    bhavesh
                    <ExternalLink  size={14} className="inline" />
                 </a>
              </div>
              </div>
      </div>
    </div>
  );
}