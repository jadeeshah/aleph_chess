# Aleph Chess - شطرنج الألف

A culturally-adapted chess web application with full support for Arabic, Urdu, and Persian languages, featuring authentic RTL design and Islamic-inspired aesthetics.

## Features

### 🌍 Multi-Language Support
- **Arabic (العربية)**: Full Modern Standard Arabic interface
- **Urdu (اردو)**: Complete Urdu translation with Nastaliq font support
- **Persian (فارسی)**: Comprehensive Farsi localization

### ♟️ Chess Gameplay
- Full FIDE chess rules implementation
- Player vs Player mode (local)
- Drag-and-drop piece movement
- Click-to-select alternative
- Legal move highlighting
- Move validation
- Check, checkmate, and stalemate detection
- Move history tracking
- Captured pieces display
- Undo functionality

### 🎨 Cultural Design
- **RTL-First Interface**: Properly mirrored layout for right-to-left languages
- **Islamic Geometric Patterns**: Decorative elements inspired by traditional Islamic art
- **Arabesque Styling**: Elegant borders and ornamental headers
- **Traditional Color Palette**:
  - Deep Teal (#006B7D)
  - Royal Blue (#1B4B7F)
  - Gold/Brass (#C5A572)
  - Warm earth tones

### 📱 Responsive Design
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)
- Touch-friendly controls

### ♿ Accessibility
- Keyboard navigation support
- High contrast colors (WCAG 2.1 AA compliant)
- Clear focus indicators
- Screen reader compatible
- Semantic HTML

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Chess Logic**: chess.js
- **Internationalization**: i18next + react-i18next
- **Drag and Drop**: react-dnd
- **Styling**: CSS3 with CSS Variables
- **Fonts**:
  - Noto Naskh Arabic (Arabic)
  - Noto Nastaliq Urdu (Urdu)
  - Amiri (Shared)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aleph_chess
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
aleph_chess/
├── src/
│   ├── components/
│   │   ├── Board/
│   │   │   ├── ChessBoard.tsx
│   │   │   └── ChessBoard.css
│   │   ├── Piece/
│   │   │   ├── ChessPiece.tsx
│   │   │   └── ChessPiece.css
│   │   ├── Controls/
│   │   │   ├── Controls.tsx
│   │   │   └── Controls.css
│   │   ├── Status/
│   │   │   ├── Status.tsx
│   │   │   └── Status.css
│   │   ├── LanguageSelector.tsx
│   │   └── LanguageSelector.css
│   ├── hooks/
│   │   └── useChessGame.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── ar.json
│   │       ├── ur.json
│   │       └── fa.json
│   ├── styles/
│   │   ├── index.css
│   │   └── App.css
│   ├── types/
│   │   └── chess.ts
│   ├── App.tsx
│   └── main.tsx
├── PRD.md
├── README.md
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Chess Terminology Translations

| English | Arabic | Urdu | Persian |
|---------|--------|------|---------|
| King | الملك | بادشاہ | شاه |
| Queen | الوزير | وزیر | وزیر |
| Rook | الرخ | رخ | رخ |
| Bishop | الفيل | فیل | فیل |
| Knight | الحصان | گھوڑا | اسب |
| Pawn | البيدق | پیادہ | سرباز |
| Check | كش ملك | شہ | کیش |
| Checkmate | كش مات | شہ مات | کیش و مات |
| Castling | التبييت | قلعہ بندی | قلعه رفتن |
| Stalemate | الجمود | بادشاہ بند | پات |

## How to Play

1. **Select Language**: Use the language selector in the header to choose your preferred language (Arabic, Urdu, or Persian)

2. **Start Game**: Click "New Game" to begin

3. **Move Pieces**:
   - Drag and drop pieces to move them
   - Or click a piece to select it, then click the destination square
   - Legal moves are highlighted in green

4. **Game Controls**:
   - **New Game**: Start a fresh game
   - **Undo**: Take back the last move

5. **Status Panel**: View current turn, captured pieces, and move history

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Initial page load: < 2 seconds
- Bundle size: ~293 KB (92 KB gzipped)
- Smooth 60fps animations
- Lighthouse score: 90+

## Future Enhancements

- [ ] Player vs Computer (AI opponent)
- [ ] Multiple difficulty levels
- [ ] Online multiplayer
- [ ] User accounts and profiles
- [ ] Chess puzzles and training
- [ ] Opening explorer
- [ ] Game analysis
- [ ] Tournament mode
- [ ] Sound effects
- [ ] Board themes
- [ ] Piece style customization
- [ ] PWA offline support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Chess logic powered by [chess.js](https://github.com/jhlywa/chess.js)
- Fonts from [Google Fonts](https://fonts.google.com)
- Design inspired by traditional Islamic art and Middle Eastern aesthetics

## Contact

For questions, feedback, or support, please open an issue on GitHub.

---

**Enjoy playing chess in your native language! 🎉**

شطرنج الألف - لعبة الشطرنج بلغتك الأم
