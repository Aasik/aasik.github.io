import java.util.Scanner;
import java.util.Stack;

public class ReverseString {

    // Reverses a string using a stack
    public static String reverse(String text) {
        Stack<Character> stack = new Stack<>();

        // Push every character onto the stack
        for (int i = 0; i < text.length(); i++) {
            stack.push(text.charAt(i));
        }

        // Pop each character off — this naturally reverses the order
        StringBuilder reversed = new StringBuilder();
        while (!stack.isEmpty()) {
            reversed.append(stack.pop());
        }

        return reversed.toString();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String text = scanner.nextLine();

        String reversed = reverse(text);
        System.out.println("Reversed string: " + reversed);

        scanner.close();
    }
}