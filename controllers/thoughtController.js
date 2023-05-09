const express = require('express');
const { User, Thought } = require('../models');
const router = express.Router();

const thoughtController = {
    getThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find().populate('reactions').populate('username');
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.id).populate('reactions').populate('username');
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createThought: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(req.body.username, { $addToSet: { thoughts: thought._id } }, { new: true });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateThought: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteThought: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);
            if (thought) {
                const user = await User.findByIdAndUpdate(thought.username, { $pull: { thoughts: thought._id } }, { new: true });
                await Reaction.deleteMany({ thoughtId: thought._id });
                res.json({ message: 'Thought deleted' });
            } else {
                res.status(404).json({ message: 'Thought not found' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createReaction: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteReaction: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;