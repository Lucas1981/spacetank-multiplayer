/* jshint esversion: 6 */

import { Node } from './Node';

export class LinkedList {
  constructor() {
    this.head = new Node('head');
  }

  head() {
    return this.head;
  }

  first() {
    return this.head.next;
  }

  find(item) {
    let currNode = this.head;
    while(currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  insert(newElement, item) {
    let newNode = new Node(newElement);
    let current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }

  push(newElement) {
    let newNode = new Node(newElement);
    let currNode = this.head;
    while(currNode.next != null) {
      currNode = currNode.next;
    }
    currNode.next = newNode;
  }

  findPrevious(item) {
    let currNode = this.head;
    while(
      currNode.next !== null &&
      currNode.next.element != item
    ) {
      currNode = currNode.next;
    }
    return currNode;
  }

  remove(item) {
    let prevNode = this.findPrevious(item);
    if(prevNode !== null) {
      prevNode.next = prevNode.next.next;
    }
  }

  display() {
    let currNode = this.head;
    while(currNode.next !== null) {
      currNode = currNode.next;
    }
  }
}
