const mongoose=require('mongoose');

const questionSchema=new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    isEnabled: {
        type: Boolean,
        required: true,
        default: true
    },
    explanation:{
      type: String,
      default: ""
    }

}, {
    timestamps: true
});

module.exports=mongoose.model('question', questionSchema);