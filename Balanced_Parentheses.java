import java.util.Scanner;
import java.util.Stack;

public class BalancedParentheses {

    // Checks whether the given expression has balanced parentheses
    public static boolean isBalanced(String expression) {
        Stack<Character> stack = new Stack<>();

        for (int i = 0; i < expression.length(); i++) {
            char ch = expression.charAt(i);

            if (ch == '(' || ch == '{' || ch == '[') {
                stack.push(ch);
            } else if (ch == ')' || ch == '}' || ch == ']') {
                if (stack.isEmpty()) {
                    return false; // closing bracket with no matching opening bracket
                }

                char top = stack.pop();

                if (!isMatchingPair(top, ch)) {
                    return false; // mismatched bracket type, e.g. "(a+b]"
                }
            }
        }

        // Balanced only if every opening bracket was matched and closed
        return stack.isEmpty();
    }

    // Checks if the opening and closing brackets are of the same type
    private static boolean isMatchingPair(char open, char close) {
        return (open == '(' && close == ')') ||
               (open == '{' && close == '}') ||
               (open == '[' && close == ']');
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter an expression: ");
        String expression = scanner.nextLine();

        if (isBalanced(expression)) {
            System.out.println("The expression has balanced parentheses.");
        } else {
            System.out.println("The expression does NOT have balanced parentheses.");
        }

        scanner.close();
    }
}