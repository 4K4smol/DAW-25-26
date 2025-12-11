class ValidacionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidacionError';
    }
}

//   throw new ValidationError("test error");


