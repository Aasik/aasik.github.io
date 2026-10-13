import java.util.Stack;

public class PushExample {

    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();

        System.out.println("Empty stack: " + stack);

        // push() adds an element to the TOP of the stack
        stack.push(10);
        System.out.println("After push(10): " + stack);

        stack.push(20);
        System.out.println("After push(20): " + stack);

        stack.push(30);
        System.out.println("After push(30): " + stack);

        // The last element pushed is always on top
        System.out.println("Current top element: " + stack.peek());
        System.out.println("Stack size: " + stack.size());
    }
}