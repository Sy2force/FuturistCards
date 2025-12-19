# Guide d'Accessibilité FuturistCards

## Vue d'ensemble

FuturistCards a été conçue avec l'accessibilité comme priorité fondamentale. Cette application respecte les directives WCAG 2.1 AA et garantit une expérience utilisateur inclusive pour tous.

## 🎯 Objectifs d'Accessibilité

- **Utilisable au clavier** : Navigation complète sans souris
- **Compatible lecteurs d'écran** : Support NVDA, JAWS, VoiceOver
- **Contrastes respectés** : Ratios conformes WCAG AA
- **Focus visible** : Indicateurs clairs de navigation
- **Messages d'état** : Annonces dynamiques pour lecteurs d'écran

## 🧩 Composants d'Accessibilité

### AccessibleInput

Composant d'entrée avec support ARIA complet.

```jsx
import AccessibleInput from '../components/forms/AccessibleInput';

<AccessibleInput
  id="email-input"
  label="Adresse email"
  type="email"
  required
  description="Votre email professionnel"
  error={errors.email}
  placeholder="exemple@email.com"
/>
```

**Fonctionnalités :**

- Labels associés automatiquement
- Descriptions et erreurs liées par ARIA
- États visuels pour erreurs/succès
- Support complet du clavier

### AriaLive

Composant pour annonces dynamiques aux lecteurs d'écran.

```jsx
import AriaLive from '../components/a11y/AriaLive';

<AriaLive 
  message="Carte créée avec succès" 
  priority="assertive" 
/>
```

**Types de priorité :**

- `polite` : Annonces non urgentes
- `assertive` : Annonces importantes

### FocusManager

Gestion avancée du focus pour modales et dialogues.

```jsx
import FocusManager from '../components/a11y/FocusManager';

<FocusManager trapFocus autoFocus>
  <div>Contenu avec focus piégé</div>
</FocusManager>
```

**Options :**

- `trapFocus` : Piège le focus dans le conteneur
- `autoFocus` : Focus automatique au montage
- `restoreFocus` : Restaure le focus précédent

### AccessibleModal

Modale conforme aux standards d'accessibilité.

```jsx
import AccessibleModal from '../components/a11y/AccessibleModal';

<AccessibleModal
  isOpen={showModal}
  onClose={closeModal}
  title="Titre de la modale"
  description="Description optionnelle"
>
  <p>Contenu de la modale</p>
</AccessibleModal>
```

**Fonctionnalités :**

- Focus piégé automatiquement
- Fermeture par Échap ou clic overlay
- Rôles ARIA appropriés
- Gestion du focus de retour

### AccessibleTabs

Système d'onglets navigable au clavier.

```jsx
import AccessibleTabs from '../components/a11y/AccessibleTabs';

const tabs = [
  { id: 'tab1', label: 'Onglet 1', content: <div>Contenu 1</div> },
  { id: 'tab2', label: 'Onglet 2', content: <div>Contenu 2</div> }
];

<AccessibleTabs tabs={tabs} />
```

**Navigation clavier :**

- `←→` : Navigation entre onglets
- `Home/End` : Premier/dernier onglet
- `Space/Enter` : Activation

### SkipLink

Lien de navigation rapide au contenu principal.

```jsx
import SkipLink from '../components/a11y/SkipLink';

<SkipLink href="#main-content" />
```

## 🎨 Styles d'Accessibilité

### Indicateurs de Focus

- Outline 3px bleu (`#3B82F6`)
- Offset de 2px pour la visibilité
- Support `focus-visible` pour les navigateurs modernes

### Contrastes de Couleurs

- Texte normal : ratio 4.5:1 minimum
- Texte large : ratio 3:1 minimum
- États d'erreur : rouge `#DC2626`
- États de succès : vert `#16A34A`

### Mode Sombre

- Adaptation automatique des contrastes
- Focus bleu clair (`#60A5FA`)
- Maintien des ratios de contraste

### Mouvement Réduit

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

### Contraste Élevé

```css
@media (prefers-contrast: high) {
  *:focus { outline: 4px solid #000; }
}
```

## ⌨️ Navigation Clavier

### Raccourcis Globaux
| Touche | Action |
|--------|--------|
| `Tab` | Navigation avant |
| `Shift + Tab` | Navigation arrière |
| `Enter/Space` | Activation d'éléments |
| `Escape` | Fermeture modales |

### Formulaires
- Navigation séquentielle entre champs
- Validation en temps réel annoncée
- Messages d'erreur liés aux champs
- Soumission par `Enter` depuis les champs

### Cartes
- Navigation par `Tab`
- Actions par `Enter/Space`
- Focus visible sur hover/focus

## 🔊 Support Lecteurs d'Écran

### Annonces Automatiques
- Messages de validation de formulaire
- Confirmations d'actions (création, modification)
- États de chargement
- Navigation entre sections

### Structures Sémantiques
- Landmarks ARIA (`main`, `nav`, `banner`)
- Headings hiérarchisés (h1-h6)
- Listes pour les collections
- Régions étiquetées

### Descriptions
- `aria-label` pour les actions sans texte
- `aria-describedby` pour les descriptions étendues
- `aria-expanded` pour les éléments dépliables
- `role` appropriés pour les composants

## 📱 Accessibilité Mobile

### Tailles de Cible
- Minimum 44x44px pour les éléments tactiles
- Espacement suffisant entre les éléments
- Zones de touch augmentées pour les petites cibles

### Orientation
- Support portrait et paysage
- Pas de restriction d'orientation forcée
- Layout adaptatif selon l'espace disponible

## 🧪 Tests d'Accessibilité

### Tests Automatisés

```bash
npm run test:a11y
```

**Couvre :**

- Conformité axe-core
- Navigation clavier
- Attributs ARIA
- Contrastes de couleur
- Structure HTML sémantique

### Tests Manuels Recommandés

#### Navigation Clavier
1. Débrancher la souris
2. Naviguer avec `Tab` uniquement
3. Vérifier tous les éléments accessibles
4. Tester activation par `Enter/Space`

#### Lecteurs d'Écran
1. **NVDA (Windows gratuit)**
   - Télécharger : https://www.nvaccess.org/
   - Tester navigation et annonces
   
2. **VoiceOver (Mac intégré)**
   - Activer : `Cmd + F5`
   - Tester avec `Ctrl + Option + flèches`

3. **Screen Reader Chrome Extension**
   - Extension navigateur pour tests rapides

#### Tests de Contraste
1. **Wave Browser Extension**
   - Installation : https://wave.webaim.org/extension/
   - Analyse automatique des contrastes

2. **Contrast Ratio Tool**
   - WebAIM : https://webaim.org/resources/contrastchecker/

## 🎯 Checklist WCAG 2.1 AA

### Niveau A
- [x] Images avec alt text approprié
- [x] Formulaires avec labels
- [x] Structure heading hiérarchisée
- [x] Navigation clavier possible
- [x] Pas de contenu clignotant

### Niveau AA
- [x] Contraste 4.5:1 pour texte normal
- [x] Contraste 3:1 pour texte large
- [x] Redimensionnement 200% sans scroll horizontal
- [x] Focus visible sur tous les éléments
- [x] Identification des erreurs de saisie

## 🔧 Outils de Développement

### Extensions Navigateur
- **Wave** : Analyse automatique
- **axe DevTools** : Tests détaillés
- **Lighthouse** : Audit global
- **Colour Contrast Analyser** : Vérification contrastes

### Outils Ligne de Commande

```bash
# Installation axe-core CLI
npm install -g axe-core

# Test d'une page
axe http://localhost:3000
```

### Validation Continue

```bash
# Tests automatisés dans CI/CD
npm run build
npm run test:a11y
npm run lint:a11y
```

## 📚 Ressources Complémentaires

### Standards et Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)

### Formation
- [WebAIM Training](https://webaim.org/training/)
- [Deque University](https://dequeuniversity.com/)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals/accessibility)

### Communauté
- [WebAIM Discussion List](https://webaim.org/discussion/)
- [A11y Slack Community](https://web-a11y.herokuapp.com/)

## 🚀 Amélioration Continue

### Feedback Utilisateurs
- Canal dédié pour retours accessibilité
- Tests avec utilisateurs en situation de handicap
- Amélioration basée sur l'usage réel

### Monitoring
- Métriques d'accessibilité dans Google Analytics
- Suivi des erreurs liées à l'accessibilité
- Performance des lecteurs d'écran

---

**Version :** 1.0  
**Dernière mise à jour :** $(date)  
**Conformité :** WCAG 2.1 AA  
**Contact :** team@futuristcards.com
