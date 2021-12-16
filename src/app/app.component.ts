import {
  animate,
  animation,
  group,
  keyframes,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, HostBinding, QueryList, ViewChildren } from '@angular/core';

export const pulse = trigger('pulse', [
  transition(
    ':enter',
    useAnimation(
      animation([
        style({ backgroundColor: 'initial' }),
        animate(
          '{{ time }} cubic-bezier(.11,.99,.83,.43)',
          keyframes([
            style({ backgroundColor: 'red', offset: 0 }),
            style({ backgroundColor: 'initial', offset: 1 }),
          ])
        ),
      ]),
      { params: { time: '2000ms' } }
    )
  ),
  transition(
    ':leave',
    useAnimation(
      animation([
        group([
          useAnimation(
            animation(
              animate(
                '{{time}}',
                style({
                  height: '0px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  marginTop: '0px',
                  marginBottom: '0px',
                })
              ),
              { params: { time: '200ms' } }
            ),
            { params: { time: '{{time}}' } }
          ),
          animate(
            '{{time}}',
            style({ opacity: '0', transform: 'translateX({{endPos}})' })
          ),
        ]),
      ]),
      { params: { time: undefined, endPos: '0px' } }
    )
  ),
]);

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //animations: [pulse],
})
export class AppComponent {
  items = [
    {
      id: 1,
      type: 'Category',
    },
    {
      id: 2,
      type: 'App',
    },
    {
      id: 3,
      type: 'App',
    },
    {
      id: 4,
      type: 'App',
    },
    {
      id: 5,
      type: 'Category',
    },
    {
      id: 6,
      type: 'Category',
    },
    {
      id: 7,
      type: 'App',
    },
    {
      id: 8,
      type: 'App',
    },
    {
      id: 9,
      type: 'App',
    },
    {
      id: 10,
      type: 'App',
    },
    {
      id: 11,
      type: 'App',
    },
  ];
  reorderedItems = [...this.items];
  draggedItem;
  draggingOverItem;
  draggingOverSeparator;
  draggingOverCategory;

  @HostBinding('class.dragging')
  get dragging(): boolean {
    return !!this.draggedItem;
  }

  handleDragStart(e, item) {
    this.draggedItem = item;

    e.dataTransfer.effectAllowed = 'copyMove';
    setTimeout(() => {
      e.target.style.visibility = 'hidden';
    }, 0);
  }

  handleDragEnd(e, item) {
    console.log('DRAG END');
    this.draggedItem = null;
    this.draggingOverItem = null;
    this.draggingOverSeparator = null;

    this.items = [...this.reorderedItems];
    setTimeout(() => {
      e.target.style.visibility = 'visible';
    }, 0);
  }

  handleItemDragEnter(e, item) {
    this.draggingOverItem = item;
  }

  handleItemDragLeave(e, item) {
    this.draggingOverItem = null;
  }

  handleSeparatorDragEnter(e, item, direction) {
    if (this.draggedItem === item) {
      return;
    }
    this.draggingOverSeparator = direction;

    e.dataTransfer.dropEffect = 'copy';

    const position =
      direction === 'right'
        ? this.reorderedItems.findIndex((i) => i === item) + 1
        : this.reorderedItems.findIndex((i) => i === item);
    const newList = [...this.reorderedItems].filter(
      (i) => i !== this.draggedItem
    );
    newList.splice(position, 0, this.draggedItem);
    console.log({ item, direction, position, daggedItem: this.draggedItem });
    this.reorderedItems = newList;
  }

  handleSeparatorDragLeave(e, item, direction) {
    this.draggingOverSeparator = null;
  }

  handleContentDragEnter(e, item) {
    e.preventDefault();

    if (this.draggingOverCategory) {
      return;
    }
    if (this.draggedItem.type === 'Category') {
      return;
    }

    console.log('ENTER DRAGGING OVER CATEGORY');

    this.draggingOverCategory = item;
  }

  handleContentDragLeave(e, item) {
    console.log('LEAVE DRAGGING OVER CATEGORY');
    this.draggingOverCategory = null;
  }

  handleContentDragOver(e, item) {
    e.preventDefault();
  }

  handleContentDrop(e, item) {
    console.log('DROP DRAGGING OVER CATEGORY');
    this.draggingOverCategory = null;
    this.reorderedItems = [...this.reorderedItems].filter(
      (i) => i !== this.draggedItem
    );
  }

  trackById(index, item) {
    return item.id;
  }
}
