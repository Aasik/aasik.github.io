import java.util.Stack;
import java.util.EmptyStackException;

public class PopExample {

    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();

        // Push some elements onto the stack
        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println("Stack (bottom to top): " + stack);

        // pop() removes AND returns the top element
        int poppedElement = stack.pop();
        System.out.println("Popped element: " + poppedElement);

        // Stack is changed after pop() — the top element is gone
        System.out.println("Stack after pop: " + stack);

        //