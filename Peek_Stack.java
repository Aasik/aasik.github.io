import java.util.Stack;
import java.util.EmptyStackException;

public class PeekExample {

    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();

        // Push some elements onto the stack
        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println("Stack (bottom to top): " + stack);

        // peek() returns the top element WITHOUT removing it
        int topElement = stack.peek();
        System.out.println("Top element (peek): " + topElement);

        // Stack is unchanged after peek()
        System.out.println("Stack after peek: " + stack);

        // Compare with pop() — this DOES remove the top element
        int poppedElement = stack.pop();
        System.out.println("Popped element: " + poppedElement);
        System.out.println("Stack after pop: " + stack);

        // Peeking an empty stack throws EmptyStackException
        Stack<Integer> emptyStack = new Stack<>();
        try {
            emptyStack.peek();
        } catch (EmptyStackException e) {
            System.out.println("Error: Cannot peek an empty stack!");
        }
    }
}