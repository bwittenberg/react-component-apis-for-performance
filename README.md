# react-ts-8imphe

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/react-ts-8imphe)

# Performant Component APIs in React

For users, performance is critical. For developers, flexibility can improve modifiability. How can React developers build performant components that are also flexible?

This post will answer the following questions using a `Tooltip` component as a concrete implementation example.

- What are function props, and what forms are available?
- How can I leverage function props to build flexible components?
- How to optimize components that use function props?
- What are the tradeoffs between the options?

The basic Tooltip component follows. It's not useful, because the trigger and content are hardcoded.

```tsx
import { useHover } from 'my-use-hover-hook'; // assume implemented as suggested on https://usehooks.com/useHover/

const TooltipContent = ({ isVisible, content }) => {
  return isVisible ? <div>content</div> : null;
}

const Tooltip = () => {
  const [hoverRef, isHovered] = useHover();
  return <span><div ref={hoverRef}>trigger</div><TooltipContent isVisible={isHovering} content="content" /></span>
}
```

## Function prop forms

### Render Props

React component APIs are defined using props. Of all the possible prop types, functions are one of the most flexible options. The function prop takes a few different forms.

Render props are described [on react.js](https://reactjs.org/docs/render-props.html), and are implemented below:

```tsx
const RenderPropCmp = ({ render }) => <div>{render()}</div>;

const App = () => {
  const renderProp = () => {
    return <div>text!</div>;
  }
  return <RenderPropCmp render={render} />;
}
```

### ReactNode Props

The most popular ReactNode prop is `children`. However, ReactNodes can be assigned to any prop, and one example is implemented below:

```tsx
const ReactNodeCmp = ({ node }) => <div>{node}</div>;

const App = () => {
  return <ReactNodeCmp node={<div>text!</div>}>
}
```

### ElementType Props

ElementType props enable consumers to pass in React elements.

```tsx
const ElementTypeCmp = ({ ElementType }) => <div><ElementType /></div>;

const App = () => {
  const ElementType = () => <div>test!</div>;
  return <ElementTypeCmp ElementType={ElementType} />;
}
```

Each implementation has tradeoffs.

Questions

- How to bind values from parent component?
- Performance
- What if slot component should get passed props? How can we add types to the slot?

References

- [https://daveceddia.com/pluggable-slots-in-react-components/](https://daveceddia.com/pluggable-slots-in-react-components/)
  - \***\*Be Mindful of PureComponent / shouldComponentUpdate\*\***
    - “In practice, components that have “slots” are probably pretty likely to be minimal and quick to render, anyway, and therefore less likely to need performance optimizations.”
    - This isn’t true for components like Dropdowns.
- [https://reactjs.org/docs/context.html#before-you-use-context](https://reactjs.org/docs/context.html#before-you-use-context)
  - One way to solve this issue **without context**
     is to [pass down the `Avatar` component itself](https://reactjs.org/docs/composition-vs-inheritance.html#containment)
     so that the intermediate components don’t need to know about the `user`
     or `avatarSize`
     props:
  - You’re not limited to a single child for a component. You may pass multiple children, or even have multiple separate “slots” for children, [as documented here](https://reactjs.org/docs/composition-vs-inheritance.html#containment)
  - This pattern is sufficient for many cases when you need to decouple a child from its immediate parents. You can take it even further with [render props](https://reactjs.org/docs/render-props.html)
     if the child needs to communicate with the parent before rendering.
- [https://reactjs.org/docs/render-props.html#be-careful-when-using-render-props-with-reactpurecomponent](https://reactjs.org/docs/render-props.html#be-careful-when-using-render-props-with-reactpurecomponent)
