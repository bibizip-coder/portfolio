"""Basic calculator operations with input validation."""

from numbers import Real


def _validate_number(value, name):
    """Return a numeric value or raise a clear validation error."""
    if isinstance(value, bool) or not isinstance(value, Real):
        raise TypeError(f"{name} must be a real number")
    return value


def add(a, b):
    """Return the sum of two real numbers."""
    return _validate_number(a, "a") + _validate_number(b, "b")


def subtract(a, b):
    """Return the difference of two real numbers."""
    return _validate_number(a, "a") - _validate_number(b, "b")


def multiply(a, b):
    """Return the product of two real numbers."""
    return _validate_number(a, "a") * _validate_number(b, "b")


def divide(a, b):
    """Return the quotient of two real numbers.

    Raises:
        TypeError: If either argument is not a real number.
        ZeroDivisionError: If b is zero.
    """
    numerator = _validate_number(a, "a")
    denominator = _validate_number(b, "b")

    if denominator == 0:
        raise ZeroDivisionError("cannot divide by zero")

    return numerator / denominator


if __name__ == "__main__":
    try:
        print("2 + 3 =", add(2, 3))
        print("2 - 3 =", subtract(2, 3))
        print("2 * 3 =", multiply(2, 3))
        print("2 / 3 =", divide(2, 3))
    except (TypeError, ZeroDivisionError) as error:
        print(f"Calculator error: {error}")
