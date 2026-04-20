package com.example.universe_backend.config;

import com.example.universe_backend.model.Certification;
import com.example.universe_backend.model.Skill;
import com.example.universe_backend.model.Task;
import com.example.universe_backend.repository.CertificationRepository;
import com.example.universe_backend.repository.SkillRepository;
import com.example.universe_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private CertificationRepository certificationRepository;

    @Override
    public void run(String... args) throws Exception {
        if (skillRepository.count() == 0) {
            // 1. Web Development (Backend)
            Skill backend = createSkill("Java Spring Boot Backend", "Backend", 
                "Master backend development. Learn to build REST APIs, connect databases, and secure servers.", 
                "FaServer", "web development,java,spring,backend,api,database");
            
            createTask(backend, "Java Basics", "Learn syntax, variables, data types, and operators.", 1);
            createTask(backend, "Java OOP", "Understand classes, objects, inheritance, and polymorphism.", 2);
            createTask(backend, "Spring Core", "Learn Dependency Injection and Inversion of Control.", 3);
            createTask(backend, "Spring Boot Intro", "Set up a project and understand auto-configuration.", 4);
            createTask(backend, "REST API Tutorial", "Create controllers, handle GET/POST methods.", 5);
            createTask(backend, "MySQL Database", "Learn SQL basics, tables, and queries.", 6);
            createTask(backend, "Spring Data JPA", "Connect your app to MySQL using repositories.", 7);
            createTask(backend, "Spring Security", "Secure your APIs with basic authentication.", 8);
            createTask(backend, "Testing Basics", "Write simple unit tests with JUnit.", 9);
            createTask(backend, "Deployment", "Deploy your application to the web.", 10);
            createCert(backend, "Oracle Certified Professional Java SE", "https://education.oracle.com/", "Oracle");

            // 2. Web Development (Frontend)
            Skill frontend = createSkill("React Frontend", "Frontend", 
                "Learn to build interactive user interfaces using React, HTML, CSS, and JavaScript.", 
                "FaCode", "web development,react,frontend,ui,javascript,html,css");
            
            createTask(frontend, "HTML Tutorial", "Learn HTML elements, attributes, headings, and paragraphs.", 1);
            createTask(frontend, "CSS Tutorial", "Learn colors, backgrounds, borders, margins, and flexbox.", 2);
            createTask(frontend, "JS Tutorial", "Learn JavaScript variables, functions, arrays, and DOM.", 3);
            createTask(frontend, "React Intro", "Understand what React is and how to set it up.", 4);
            createTask(frontend, "React Components", "Build reusable functional components.", 5);
            createTask(frontend, "React Props", "Pass data between components.", 6);
            createTask(frontend, "React State (useState)", "Manage data within components.", 7);
            createTask(frontend, "React useEffect", "Fetch data from APIs and manage side effects.", 8);
            createTask(frontend, "React Router", "Navigate between multiple pages.", 9);
            createTask(frontend, "Deploy React App", "Host your application on Vercel or Netlify.", 10);
            createCert(frontend, "Meta Front-End Developer", "https://www.coursera.org/professional-certificates/meta-front-end-developer", "Coursera");

            // 3. Data Science & AI
            Skill dataScience = createSkill("Data Science & AI", "Data Science", 
                "Learn Python, analyze data, and build Artificial Intelligence models.", 
                "FaDatabase", "data science,artificial intelligence,machine learning,ai,python,analytics");
            
            createTask(dataScience, "Python Tutorial", "Learn Python syntax, variables, lists, and dicts.", 1);
            createTask(dataScience, "Math for AI", "Basic statistics, probability, and linear algebra.", 2);
            createTask(dataScience, "Pandas Tutorial", "Analyze data tables and manipulate datasets.", 3);
            createTask(dataScience, "Matplotlib Tutorial", "Create charts, graphs, and visualize data.", 4);
            createTask(dataScience, "Machine Learning Intro", "Understand Supervised vs Unsupervised learning.", 5);
            createTask(dataScience, "Scikit-Learn Basics", "Implement simple regression and classification models.", 6);
            createTask(dataScience, "Model Testing", "Evaluate model accuracy using train/test splits.", 7);
            createTask(dataScience, "AI Concepts", "Understand Neural Networks and Deep Learning basics.", 8);
            createTask(dataScience, "NLP Basics", "Analyze text and sentiment using natural language processing.", 9);
            createTask(dataScience, "AI Project", "Build a simple prediction or classification app.", 10);
            createCert(dataScience, "IBM Data Science Professional", "https://www.coursera.org/professional-certificates/ibm-data-science", "Coursera");

            // 4. UI/UX Design
            Skill uiux = createSkill("UI/UX Design", "Design", 
                "Design beautiful, user-centered digital experiences and interfaces.", 
                "FaCode", "ui/ux design,design,figma,user experience,interface");
            
            createTask(uiux, "UX Introduction", "What is User Experience? Learn the design thinking process.", 1);
            createTask(uiux, "User Research", "How to understand your target audience and create personas.", 2);
            createTask(uiux, "Wireframing", "Sketch layouts and low-fidelity structural designs.", 3);
            createTask(uiux, "Color Theory", "Choose color palettes that communicate the right mood.", 4);
            createTask(uiux, "Typography", "Select and pair fonts effectively for readability.", 5);
            createTask(uiux, "Figma Tutorial", "Learn the basics of the Figma interface and tools.", 6);
            createTask(uiux, "UI Components", "Design buttons, inputs, and navigation bars.", 7);
            createTask(uiux, "Prototyping", "Link screens together to create interactive flows.", 8);
            createTask(uiux, "Usability Testing", "Test your prototype with users and gather feedback.", 9);
            createTask(uiux, "Handoff", "Export assets and prepare designs for developers.", 10);
            createCert(uiux, "Google UX Design Professional", "https://www.coursera.org/professional-certificates/google-ux-design", "Coursera");

            // 5. Cloud Infrastructure
            Skill cloud = createSkill("Cloud Infrastructure (AWS)", "Cloud", 
                "Deploy, manage, and scale applications on Amazon Web Services.", 
                "FaCloud", "cloud infrastructure,cloud,aws,devops,deployment");
            
            createTask(cloud, "Cloud Basics", "What is Cloud Computing? IaaS vs PaaS vs SaaS.", 1);
            createTask(cloud, "AWS Intro", "Navigate the AWS Console and understand global infrastructure.", 2);
            createTask(cloud, "IAM Tutorial", "Create users, roles, and manage permissions securely.", 3);
            createTask(cloud, "EC2 Tutorial", "Launch and connect to a Virtual Machine in the cloud.", 4);
            createTask(cloud, "S3 Tutorial", "Store files, images, and host static websites.", 5);
            createTask(cloud, "VPC Basics", "Understand networking, subnets, and security groups.", 6);
            createTask(cloud, "RDS Tutorial", "Set up a managed relational database in the cloud.", 7);
            createTask(cloud, "Auto Scaling", "Automatically add/remove servers based on traffic.", 8);
            createTask(cloud, "Serverless (Lambda)", "Run code without managing servers.", 9);
            createTask(cloud, "CloudWatch", "Monitor resources and set up billing alarms.", 10);
            createCert(cloud, "AWS Certified Solutions Architect", "https://aws.amazon.com/certification/", "AWS");

            // 6. Mobile Apps
            Skill mobile = createSkill("Mobile App Development", "Mobile", 
                "Build cross-platform mobile applications for iOS and Android using React Native.", 
                "FaCode", "mobile apps,react native,ios,android,mobile");
            
            createTask(mobile, "React Native Intro", "Understand what React Native is and set up Expo.", 1);
            createTask(mobile, "Core Components", "Learn View, Text, Image, and TextInput components.", 2);
            createTask(mobile, "Styling Tutorial", "Style components using Flexbox and StyleSheet.", 3);
            createTask(mobile, "State Management", "Use useState to handle dynamic app data.", 4);
            createTask(mobile, "Handling Touches", "Make elements interactive with TouchableOpacity and Buttons.", 5);
            createTask(mobile, "Lists Tutorial", "Render long lists efficiently using FlatList.", 6);
            createTask(mobile, "Navigation", "Add screen routing using React Navigation (Stack & Tabs).", 7);
            createTask(mobile, "Data Fetching", "Call external APIs to load data into your app.", 8);
            createTask(mobile, "Device Features", "Access the camera or device location.", 9);
            createTask(mobile, "Publishing", "Build the APK/IPA and submit to app stores.", 10);
            createCert(mobile, "Meta React Native Specialization", "https://www.coursera.org/specializations/meta-react-native", "Coursera");

            // 7. Cybersecurity
            Skill security = createSkill("Cybersecurity Fundamentals", "Security", 
                "Learn to protect networks, devices, and data from unauthorized access.", 
                "FaShieldAlt", "cybersecurity,security,hacking,network,defense");
            
            createTask(security, "Cybersecurity Intro", "Understand the CIA Triad (Confidentiality, Integrity, Availability).", 1);
            createTask(security, "Networking Basics", "Learn TCP/IP, IP Addresses, and common Ports.", 2);
            createTask(security, "Command Line", "Basic Linux/Windows terminal commands for security.", 3);
            createTask(security, "Web Vulnerabilities", "Learn about SQL Injection and Cross-Site Scripting (XSS).", 4);
            createTask(security, "Cryptography", "Understand encryption, decryption, and hashing algorithms.", 5);
            createTask(security, "Network Defense", "How firewalls, VPNs, and Intrusion Detection Systems work.", 6);
            createTask(security, "Ethical Hacking Intro", "What is penetration testing? Intro to Kali Linux.", 7);
            createTask(security, "Social Engineering", "Recognize phishing, baiting, and manipulation tactics.", 8);
            createTask(security, "Incident Response", "Steps to take during and after a security breach.", 9);
            createTask(security, "Security Best Practices", "Password management, MFA, and system updates.", 10);
            createCert(security, "CompTIA Security+", "https://www.comptia.org/certifications/security", "CompTIA");

            // 8. Game Development
            Skill gameDev = createSkill("Game Development (Unity)", "Gaming", 
                "Create immersive 2D and 3D games using the Unity engine and C#.", 
                "FaCode", "game development,unity,c#,gaming,3d,2d");
            
            createTask(gameDev, "Unity Intro", "Download Unity Hub and understand the Editor interface.", 1);
            createTask(gameDev, "GameObjects", "Learn about GameObjects, scenes, and the hierarchy.", 2);
            createTask(gameDev, "C# Basics for Unity", "Write basic C# scripts, variables, and methods.", 3);
            createTask(gameDev, "Transforms & Movement", "Move, rotate, and scale objects using code.", 4);
            createTask(gameDev, "Physics Tutorial", "Add Rigidbodies and Colliders for realistic physics.", 5);
            createTask(gameDev, "User Input", "Make characters move using keyboard or controller input.", 6);
            createTask(gameDev, "Prefabs", "Create reusable templates for enemies or items.", 7);
            createTask(gameDev, "Game UI", "Build menus, health bars, and score counters using Canvas.", 8);
            createTask(gameDev, "Audio Tutorial", "Add background music and sound effects.", 9);
            createTask(gameDev, "Build & Export", "Compile your game for PC, Web, or Mobile.", 10);
            createCert(gameDev, "Unity Certified Associate", "https://unity.com/products/certifications", "Unity");
        }
    }

    private Skill createSkill(String name, String category, String desc, String icon, String tags) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setCategory(category);
        skill.setDescription(desc);
        skill.setIconUrl(icon);
        skill.setTags(tags);
        return skillRepository.save(skill);
    }

    private void createTask(Skill skill, String title, String description, int order) {
        Task task = new Task();
        task.setSkill(skill);
        task.setTitle(title);
        task.setDescription(description);
        task.setOrderIndex(order);
        taskRepository.save(task);
    }
    
    private void createCert(Skill skill, String name, String url, String platform) {
        Certification cert = new Certification();
        cert.setSkill(skill);
        cert.setName(name);
        cert.setUrl(url);
        cert.setPlatform(platform);
        certificationRepository.save(cert);
    }
}
