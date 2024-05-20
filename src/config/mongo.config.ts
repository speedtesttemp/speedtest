import mongoose from "mongoose";

class mongooseConfig {
  private stringConnection: string;

  /**
   * Creates an instance of the mongooseConfig class.
   */
  constructor() {
    this.stringConnection = process.env.MONGO_URI || "";
  }
  /**
   * Connects to MongoDB using the provided connection string.
   */
  async connect() {
    mongoose
      .connect(this.stringConnection)
      .then(async () => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB: " + error);
      });
  }
}

export default new mongooseConfig();
