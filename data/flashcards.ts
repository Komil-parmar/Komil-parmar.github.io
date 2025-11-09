// ===========================
// Flashcards Data
// ===========================
// EASY TO EDIT: Add, remove, or reorder flashcards by modifying this array

export interface Flashcard {
  id: number;
  category: 'basics' | 'deep-learning' | 'meta-learning';
  question: string;
  answer: string;
}

export const flashcardsData: Flashcard[] = [
  // ML Basics
  {
    id: 1,
    category: 'basics',
    question: 'What is the difference between supervised and unsupervised learning?',
    answer: 'Supervised learning uses labeled data to train models (input-output pairs), while unsupervised learning finds patterns in unlabeled data. Think of supervised as learning with a teacher, unsupervised as exploring on your own.'
  },
  {
    id: 2,
    category: 'basics',
    question: 'What is overfitting and how do you prevent it?',
    answer: 'Overfitting is when a model learns the training data too well, including noise, and performs poorly on new data. Prevent it with: regularization (L1/L2), dropout, early stopping, cross-validation, and more training data.'
  },
  {
    id: 3,
    category: 'basics',
    question: 'What is the bias-variance tradeoff?',
    answer: 'Bias is error from oversimplifying (underfitting), variance is error from being too sensitive to training data (overfitting). You need to balance both—low bias + low variance = good generalization.'
  },
  {
    id: 4,
    category: 'basics',
    question: 'What is gradient descent?',
    answer: 'An optimization algorithm that iteratively adjusts model parameters to minimize loss. It calculates the gradient (slope) of the loss function and moves in the opposite direction to find the minimum. Like walking downhill to reach the valley.'
  },
  {
    id: 5,
    category: 'basics',
    question: 'What is transfer learning?',
    answer: 'Using knowledge from one task to help learn another. Like using a pre-trained ImageNet model for medical imaging. The model already learned useful features (edges, shapes), so you just fine-tune it for your specific task with less data.'
  },
  {
    id: 6,
    category: 'basics',
    question: 'What is cross-validation?',
    answer: 'A technique to assess model performance by splitting data into k folds. Train on k-1 folds, validate on the remaining fold, repeat k times. Gives a more robust estimate of performance than a single train/test split.'
  },
  {
    id: 7,
    category: 'basics',
    question: 'What is the learning rate and why does it matter?',
    answer: 'Controls how much to adjust weights during training. Too high → unstable training, overshooting minima. Too low → slow convergence, getting stuck. Finding the right learning rate is crucial. Techniques: learning rate schedules, adaptive optimizers (Adam).'
  },

  // Deep Learning
  {
    id: 8,
    category: 'deep-learning',
    question: 'What is backpropagation?',
    answer: 'The algorithm neural networks use to learn. It calculates gradients by propagating errors backward through the network, from output to input, using the chain rule. Each layer adjusts its weights based on how much it contributed to the error.'
  },
  {
    id: 9,
    category: 'deep-learning',
    question: 'Why do we use activation functions?',
    answer: 'Activation functions introduce non-linearity, allowing neural networks to learn complex patterns. Without them, stacking layers would be pointless—multiple linear transformations just create another linear transformation. ReLU, sigmoid, and tanh are common choices.'
  },
  {
    id: 10,
    category: 'deep-learning',
    question: 'What is batch normalization?',
    answer: 'A technique that normalizes inputs to each layer during training, making training faster and more stable. It reduces internal covariate shift and acts as a regularizer. Think of it as keeping each layer\'s inputs in a consistent range.'
  },
  {
    id: 11,
    category: 'deep-learning',
    question: 'What is the vanishing gradient problem?',
    answer: 'When gradients become extremely small during backpropagation in deep networks, early layers barely learn. Happens with sigmoid/tanh activations. Solutions: ReLU activation, skip connections (ResNet), batch normalization, and careful initialization.'
  },
  {
    id: 12,
    category: 'deep-learning',
    question: 'What is dropout and why use it?',
    answer: 'Regularization technique that randomly "drops" neurons during training (sets outputs to 0). Prevents co-adaptation of neurons and overfitting. Each training iteration uses a different "thinned" network, creating an ensemble effect.'
  },
  {
    id: 13,
    category: 'deep-learning',
    question: 'What are convolutional neural networks (CNNs)?',
    answer: 'Neural networks specialized for processing grid-like data (images, video). They use convolutional layers that learn spatial hierarchies of features—edges, then shapes, then objects. More parameter-efficient than fully connected networks for vision tasks.'
  },
  {
    id: 14,
    category: 'deep-learning',
    question: 'What are recurrent neural networks (RNNs)?',
    answer: 'Networks designed for sequential data (text, time series). They have loops that maintain a "memory" of previous inputs. LSTMs and GRUs are popular RNN variants that handle long-term dependencies better than vanilla RNNs.'
  },

  // Meta-Learning
  {
    id: 15,
    category: 'meta-learning',
    question: 'What is meta-learning?',
    answer: 'Learning to learn! Instead of training models for one task, meta-learning trains models to quickly adapt to new tasks with minimal data. It\'s about learning good learning strategies and initial parameters that generalize across tasks.'
  },
  {
    id: 16,
    category: 'meta-learning',
    question: 'What is few-shot learning?',
    answer: 'A meta-learning paradigm where models learn from very few examples (1-shot, 5-shot, etc.). Instead of thousands of samples, the model learns to classify new categories with just a handful of examples—like humans do.'
  },
  {
    id: 17,
    category: 'meta-learning',
    question: 'What is MAML (Model-Agnostic Meta-Learning)?',
    answer: 'A meta-learning algorithm that finds good initial parameters for a model, so it can quickly adapt to new tasks with gradient descent. It\'s model-agnostic—works with any gradient-based model. Think of it as finding the best starting point for learning.'
  },
  {
    id: 18,
    category: 'meta-learning',
    question: 'What is the difference between meta-training and meta-testing?',
    answer: 'Meta-training: Learning across many tasks to acquire meta-knowledge. Meta-testing: Applying learned meta-knowledge to completely new tasks. It\'s like practicing how to learn new languages (meta-training) vs. actually learning a new one (meta-testing).'
  },
  {
    id: 19,
    category: 'meta-learning',
    question: 'Why is meta-learning important?',
    answer: 'It tackles data efficiency—most real-world problems don\'t have millions of labeled examples. Meta-learning enables rapid adaptation, better generalization, and human-like learning from limited data. Essential for robotics, personalization, and domains with scarce data.'
  },
  {
    id: 20,
    category: 'meta-learning',
    question: 'What is the support set and query set in meta-learning?',
    answer: 'Support set: Few labeled examples given to adapt the model to a new task. Query set: Examples used to evaluate how well the model adapted. It\'s like showing flashcards (support) then testing recall (query).'
  }
];
