const { getFirestore } = require('../config/firebase');

class Task {
  constructor(id, title, description, assignedTo, assignedBy, status, priority, dueDate, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.assignedTo = assignedTo; // User ID
    this.assignedBy = assignedBy; // Admin ID
    this.status = status || 'pending'; // pending, in-progress, completed, cancelled
    this.priority = priority || 'medium'; // low, medium, high, urgent
    this.dueDate = dueDate;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // Create new task in Firebase
  static async create(taskData) {
    const { title, description, assignedTo, assignedBy, status, priority, dueDate } = taskData;
    const db = getFirestore();
    
    try {
      const taskDoc = {
        title,
        description,
        assignedTo,
        assignedBy,
        status: status || 'pending',
        priority: priority || 'medium',
        dueDate: dueDate || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const docRef = await db.collection('tasks').add(taskDoc);
      
      return {
        id: docRef.id,
        ...taskDoc
      };
    } catch (error) {
      throw new Error(`Failed to create task: ${error.message}`);
    }
  }

  // Get all tasks
  static async getAll() {
    const db = getFirestore();
    
    try {
      const snapshot = await db.collection('tasks').orderBy('createdAt', 'desc').get();
      const tasks = [];
      
      snapshot.forEach(doc => {
        tasks.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return tasks;
    } catch (error) {
      throw new Error(`Failed to get tasks: ${error.message}`);
    }
  }

  // Get task by ID
  static async getById(taskId) {
    const db = getFirestore();
    
    try {
      const doc = await db.collection('tasks').doc(taskId).get();
      
      if (!doc.exists) {
        throw new Error('Task not found');
      }
      
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      throw new Error(`Failed to get task: ${error.message}`);
    }
  }

  // Get tasks by user ID
  static async getByUserId(userId) {
    const db = getFirestore();
    
    try {
      const snapshot = await db.collection('tasks')
        .where('assignedTo', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
      
      const tasks = [];
      snapshot.forEach(doc => {
        tasks.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return tasks;
    } catch (error) {
      throw new Error(`Failed to get user tasks: ${error.message}`);
    }
  }

  // Update task
  static async update(taskId, updateData) {
    const db = getFirestore();
    
    try {
      const taskRef = db.collection('tasks').doc(taskId);
      const doc = await taskRef.get();
      
      if (!doc.exists) {
        throw new Error('Task not found');
      }
      
      const updatedData = {
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      await taskRef.update(updatedData);
      
      const updatedDoc = await taskRef.get();
      return {
        id: updatedDoc.id,
        ...updatedDoc.data()
      };
    } catch (error) {
      throw new Error(`Failed to update task: ${error.message}`);
    }
  }

  // Delete task
  static async delete(taskId) {
    const db = getFirestore();
    
    try {
      const taskRef = db.collection('tasks').doc(taskId);
      const doc = await taskRef.get();
      
      if (!doc.exists) {
        throw new Error('Task not found');
      }
      
      await taskRef.delete();
      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete task: ${error.message}`);
    }
  }

  // Get task statistics
  static async getStatistics() {
    const db = getFirestore();
    
    try {
      const snapshot = await db.collection('tasks').get();
      
      const stats = {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        cancelled: 0,
        byPriority: {
          low: 0,
          medium: 0,
          high: 0,
          urgent: 0
        },
        overdue: 0
      };
      
      const now = new Date();
      
      snapshot.forEach(doc => {
        const task = doc.data();
        stats.total++;
        
        // Count by status
        if (task.status === 'pending') stats.pending++;
        else if (task.status === 'in-progress') stats.inProgress++;
        else if (task.status === 'completed') stats.completed++;
        else if (task.status === 'cancelled') stats.cancelled++;
        
        // Count by priority
        if (task.priority) {
          stats.byPriority[task.priority]++;
        }
        
        // Count overdue
        if (task.dueDate && task.status !== 'completed') {
          const dueDate = new Date(task.dueDate);
          if (dueDate < now) {
            stats.overdue++;
          }
        }
      });
      
      return stats;
    } catch (error) {
      throw new Error(`Failed to get statistics: ${error.message}`);
    }
  }
}

module.exports = Task;
