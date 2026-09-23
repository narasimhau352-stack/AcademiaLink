import prisma from "../config/database.js";
const questionBanks = {
  Python: [
    {
      question: "Which keyword is used to define a function in Python?",
      optionA: "function",
      optionB: "def",
      optionC: "fun",
      optionD: "define",
      correctAnswer: "B",
      difficulty: "EASY",
    },
    {
      question: "Which data structure stores key-value pairs in Python?",
      optionA: "List",
      optionB: "Tuple",
      optionC: "Dictionary",
      optionD: "Set",
      correctAnswer: "C",
      difficulty: "EASY",
    },
    {
      question: "What is the output of len([10, 20, 30])?",
      optionA: "2",
      optionB: "3",
      optionC: "10",
      optionD: "30",
      correctAnswer: "B",
      difficulty: "EASY",
    },
    {
      question: "Which statement is commonly used to handle exceptions in Python?",
      optionA: "try-except",
      optionB: "if-else",
      optionC: "switch-case",
      optionD: "check-catch",
      correctAnswer: "A",
      difficulty: "MEDIUM",
    },
    {
      question: "Which syntax allows a function to receive variable positional arguments?",
      optionA: "*args",
      optionB: "**args",
      optionC: "varargs",
      optionD: "multiargs",
      correctAnswer: "A",
      difficulty: "MEDIUM",
    },
  ],

  Java: [
    {
      question: "Which keyword is used to create a class in Java?",
      optionA: "object",
      optionB: "class",
      optionC: "struct",
      optionD: "type",
      correctAnswer: "B",
      difficulty: "EASY",
    },
    {
      question: "Which method is the starting point of a Java application?",
      optionA: "start()",
      optionB: "run()",
      optionC: "main()",
      optionD: "execute()",
      correctAnswer: "C",
      difficulty: "EASY",
    },
    {
      question: "Which concept allows one class to acquire properties of another class?",
      optionA: "Encapsulation",
      optionB: "Inheritance",
      optionC: "Abstraction",
      optionD: "Compilation",
      correctAnswer: "B",
      difficulty: "EASY",
    },
    {
      question: "Which keyword is used when a class inherits another class?",
      optionA: "inherits",
      optionB: "implements",
      optionC: "extends",
      optionD: "super",
      correctAnswer: "C",
      difficulty: "MEDIUM",
    },
    {
      question: "Which collection does not allow duplicate elements?",
      optionA: "List",
      optionB: "Set",
      optionC: "ArrayList",
      optionD: "Vector",
      correctAnswer: "B",
      difficulty: "MEDIUM",
    },
  ],

  SQL: [
    {
      question: "Which SQL command is used to retrieve data from a table?",
      optionA: "GET",
      optionB: "FETCH",
      optionC: "SELECT",
      optionD: "READ",
      correctAnswer: "C",
      difficulty: "EASY",
    },
    {
      question: "Which clause is used to filter rows in SQL?",
      optionA: "WHERE",
      optionB: "FILTER",
      optionC: "HAVING",
      optionD: "CHECK",
      correctAnswer: "A",
      difficulty: "EASY",
    },
    {
      question: "Which command is used to add a new row to a table?",
      optionA: "ADD",
      optionB: "INSERT",
      optionC: "CREATE",
      optionD: "APPEND",
      correctAnswer: "B",
      difficulty: "EASY",
    },
    {
      question: "Which SQL operation combines rows from related tables?",
      optionA: "JOIN",
      optionB: "MERGE",
      optionC: "CONNECT",
      optionD: "RELATE",
      correctAnswer: "A",
      difficulty: "MEDIUM",
    },
    {
      question: "Which clause is commonly used to filter grouped results?",
      optionA: "WHERE",
      optionB: "GROUP",
      optionC: "HAVING",
      optionD: "FILTER",
      correctAnswer: "C",
      difficulty: "MEDIUM",
    },
  ],

  React: [
    {
      question: "React is primarily used for building what?",
      optionA: "Databases",
      optionB: "User interfaces",
      optionC: "Operating systems",
      optionD: "Network drivers",
      correctAnswer: "B",
      difficulty: "EASY",
    },
    {
      question: "Which syntax is commonly used to write HTML-like elements in React?",
      optionA: "JQuery",
      optionB: "JSX",
      optionC: "XMLSQL",
      optionD: "RJS",
      correctAnswer: "B",
      difficulty: "EASY",
    },
    {
      question: "Which hook is commonly used to manage state in a functional component?",
      optionA: "useState",
      optionB: "useData",
      optionC: "useValue",
      optionD: "useComponent",
      correctAnswer: "A",
      difficulty: "EASY",
    },
    {
      question: "Which hook is commonly used for side effects?",
      optionA: "useEffect",
      optionB: "useAction",
      optionC: "useSide",
      optionD: "useEvent",
      correctAnswer: "A",
      difficulty: "MEDIUM",
    },
    {
      question: "What is a React component?",
      optionA: "A reusable UI building block",
      optionB: "A database table",
      optionC: "A CSS property",
      optionD: "A server",
      correctAnswer: "A",
      difficulty: "MEDIUM",
    },
  ],

  "Machine Learning": [
    {
      question: "Which type of learning uses labeled training data?",
      optionA: "Supervised learning",
      optionB: "Unsupervised learning",
      optionC: "Random learning",
      optionD: "Manual learning",
      correctAnswer: "A",
      difficulty: "EASY",
    },
    {
      question: "Which algorithm is commonly used for classification?",
      optionA: "Linear Regression",
      optionB: "Logistic Regression",
      optionC: "PCA",
      optionD: "K-Means only",
      correctAnswer: "B",
      difficulty: "EASY",
    },
    {
      question: "What is the purpose of a training dataset?",
      optionA: "To train a model",
      optionB: "To delete a model",
      optionC: "To create a database",
      optionD: "To design a webpage",
      correctAnswer: "A",
      difficulty: "EASY",
    },
    {
      question: "What does overfitting generally mean?",
      optionA: "The model performs well only on training data",
      optionB: "The model has no data",
      optionC: "The model cannot be trained",
      optionD: "The dataset is empty",
      correctAnswer: "A",
      difficulty: "MEDIUM",
    },
    {
      question: "Which technique can help reduce the number of input features?",
      optionA: "PCA",
      optionB: "HTML",
      optionC: "HTTP",
      optionD: "JSON",
      correctAnswer: "A",
      difficulty: "MEDIUM",
    },
  ],
};

const seedQuestions = async () => {
  for (const [skillName, questions] of Object.entries(questionBanks)) {
    const skill = await prisma.skill.findUnique({
      where: {
        name: skillName,
      },
    });

    if (!skill) {
      console.log(`Skill not found: ${skillName}`);
      continue;
    }

    await prisma.assessmentQuestion.deleteMany({
      where: {
        skillId: skill.id,
      },
    });

    await prisma.assessmentQuestion.createMany({
      data: questions.map((question) => ({
        ...question,
        skillId: skill.id,
      })),
    });

    console.log(
      `${skillName}: ${questions.length} questions added`
    );
  }
};

seedQuestions()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });