import java.util.Scanner;
import java.util.Stack;

public class DecimalToBinary {

    // Converts a decimal number to its binary representation using a stack
    public static String decimalToBinary(int decimal) {
        if (decimal == 0) {
            return "0";
        }

        Stack<Integer> stack = new Stack<>();
        int number = decimal;

        // Repeatedly divide by 2, pushing each remainder onto the stack
        while (number > 0) {
            int remainder = number % 2;
            stack.push(remainder);
            number = number / 2;
        }

        // Pop the stack to build the binary number in the correct order
        StringBuilder binary = new StringBuilder();
        while (!stack.isEmpty()) {
            binary.append(stack.pop());
        }

        return binary.toString();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a decimal number: ");
        int decimal = scanner.nextInt();

        String binary = decimalToBinary(decimal);
        System.out.println(decimal + " in decimal = " + binary + " in binary");

        scanner.close();
    }
}