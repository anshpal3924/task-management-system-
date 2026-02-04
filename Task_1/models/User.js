const bcrypt = require('bcryptjs');
const { getFirestore } = require('../config/firebase');

class User {
  constructor(id, name, email, password, role, createdAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role || 'user'; // Default role is 'user'
    this.createdAt = createdAt || new Date();
  }

  // Hash password
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // Compare password
  static async comparePassword(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }

  // Create new user in Firebase
  static async create(userData) {
    const { name, email, password, role } = userData;
    const db = getFirestore();
    
    try {
      // Check if user already exists
      const usersRef = db.collection('users');
      const querySnapshot = await usersRef.where('email', '==', email).get();
      
      if (!querySnapshot.empty) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await this.hashPassword(password);
      
      // Create user document
      const userDoc = {
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
        createdAt: new Date().toISOString()
      };
      
      // Add to Firestore
      const docRef = await usersRef.add(userDoc);
      
      // Return user with ID
      return new User(
        docRef.id,
        name,
        email,
        hashedPassword,
        userDoc.role,
        userDoc.createdAt
      );
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    const db = getFirestore();
    
    try {
      const usersRef = db.collection('users');
      const querySnapshot = await usersRef.where('email', '==', email).get();
      
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      return new User(
        doc.id,
        data.name,
        data.email,
        data.password,
        data.role,
        data.createdAt
      );
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    const db = getFirestore();
    
    try {
      const userDoc = await db.collection('users').doc(id).get();
      
      if (!userDoc.exists) {
        return null;
      }
      
      const data = userDoc.data();
      
      return new User(
        userDoc.id,
        data.name,
        data.email,
        data.password,
        data.role,
        data.createdAt
      );
    } catch (error) {
      throw error;
    }
  }

  // Get all users (admin only)
  static async getAll() {
    const db = getFirestore();
    
    try {
      const usersSnapshot = await db.collection('users').get();
      
      return usersSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          role: data.role,
          createdAt: data.createdAt
        };
      });
    } catch (error) {
      throw error;
    }
  }

  // Update user
  static async update(id, updateData) {
    const db = getFirestore();
    
    try {
      await db.collection('users').doc(id).update(updateData);
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  static async delete(id) {
    const db = getFirestore();
    
    try {
      await db.collection('users').doc(id).delete();
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Get user without password
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;
