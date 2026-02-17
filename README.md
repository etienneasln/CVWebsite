# CVWebsite

CVWebsite is an interactive portfolio built using **Phaser (JavaScript)** and **Tiled**.  
Instead of presenting a traditional scroll-based resume, this project allows visitors to explore a small 2D world where buildings and rooms represent different parts of my professional profile.

The experience is inspired by classic top-down RPGs: the visitor controls a character, walks around an overworld, and enters buildings that correspond to sections such as education, professional experience, and projects. Interiors are designed using Tiled, with collision layers, object layers, and scene transitions handled in Phaser.

## Tech Stack

- **Phaser 3** (Arcade Physics, scene management, rendering)
- **JavaScript**
- **Tiled Map Editor** (tilemaps, object layers, collision layers)

## Features

- Multi-scene architecture (exterior and interior maps)
- Scene transitions via door objects
- Tilemap-based collision handling
- Y-based depth sorting (player can walk in front of / behind objects)
- Object-layer furniture placement from Tiled
- Modular scene inheritance structure

## Running the Project

For now, using the Phaser Launcher is necessary.
