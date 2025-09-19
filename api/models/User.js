// User model - This is a placeholder for database integration
// In a real application, this would be replaced with actual database models
// (e.g., Mongoose for MongoDB, Sequelize for SQL databases, etc.)

class User {
  constructor(userData) {
    this.id = userData.id || this.generateId();
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.email = userData.email;
    this.company = userData.company;
    this.password = userData.password; // Should be hashed
    this.isVerified = userData.isVerified || false;
    this.agreeToTerms = userData.agreeToTerms || false;
    this.createdAt = userData.createdAt || new Date();
    this.updatedAt = userData.updatedAt || new Date();
    this.verifiedAt = userData.verifiedAt || null;
    this.lastLoginAt = userData.lastLoginAt || null;
    this.role = userData.role || "user";
    this.isActive = userData.isActive !== undefined ? userData.isActive : true;
  }

  // Generate unique ID (in real app, this would be handled by database)
  generateId() {
    return Date.now().toString() + Math.random().toString(36).substring(2);
  }

  // Get user's full name
  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  // Get user data without sensitive information
  getPublicData() {
    const { password, ...publicData } = this;
    return publicData;
  }

  // Update user data
  update(updateData) {
    const allowedFields = ["firstName", "lastName", "company"];

    allowedFields.forEach((field) => {
      if (updateData[field] !== undefined) {
        this[field] = updateData[field];
      }
    });

    this.updatedAt = new Date();
    return this;
  }

  // Mark user as verified
  markAsVerified() {
    this.isVerified = true;
    this.verifiedAt = new Date();
    this.updatedAt = new Date();
    return this;
  }

  // Update last login time
  updateLastLogin() {
    this.lastLoginAt = new Date();
    this.updatedAt = new Date();
    return this;
  }

  // Validate user data
  validate() {
    const errors = [];

    if (!this.firstName || this.firstName.trim().length < 2) {
      errors.push("First name must be at least 2 characters long");
    }

    if (!this.lastName || this.lastName.trim().length < 2) {
      errors.push("Last name must be at least 2 characters long");
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push("Valid email address is required");
    }

    if (!this.company || this.company.trim().length < 2) {
      errors.push("Company name must be at least 2 characters long");
    }

    if (!this.password) {
      errors.push("Password is required");
    }

    if (!this.agreeToTerms) {
      errors.push("Must agree to terms and conditions");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Email validation helper
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Convert to JSON (for API responses)
  toJSON() {
    return this.getPublicData();
  }

  // Static methods for database operations (placeholders)

  // Find user by email
  static async findByEmail(email) {
    // This would query the database in a real application
    // For now, it returns null as we're using in-memory storage
    return null;
  }

  // Find user by ID
  static async findById(id) {
    // This would query the database in a real application
    return null;
  }

  // Create new user
  static async create(userData) {
    // This would create a user in the database
    const user = new User(userData);
    const validation = user.validate();

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
    }

    return user;
  }

  // Save user to database
  async save() {
    // This would save the user to the database
    this.updatedAt = new Date();
    return this;
  }

  // Delete user
  async delete() {
    // This would delete the user from the database
    return true;
  }

  // Find all users (with pagination)
  static async findAll(options = {}) {
    // This would query the database with pagination
    return {
      users: [],
      total: 0,
      page: options.page || 1,
      limit: options.limit || 10,
    };
  }

  // Update user by ID
  static async updateById(id, updateData) {
    // This would update the user in the database
    return null;
  }

  // Delete user by ID
  static async deleteById(id) {
    // This would delete the user from the database
    return true;
  }
}

module.exports = User;
