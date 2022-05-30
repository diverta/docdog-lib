import { defineConfig } from 'vite';
import defineConfigIife from './vite.iife.config.js';

export default defineConfig((settings) => defineConfigIife(settings, 'lib2'));
