module Main (main) where

import Data.Char (toUpper)

main :: IO ()
main = mapM_ putStrLn [base, camel, capital]

alphabet, base, camel, capital :: String
alphabet = ['a'..'z']
base = "s!.*/\\([a-zA-Z0-9_-]\\+\\)\\..*!\\1!;"
camel = alphabet >>= (\a -> "s/-" ++ [a] ++ "/" ++ [toUpper a] ++ "/g; ")
capital = alphabet >>= (\a -> "s/^" ++ [a] ++ "/" ++ [toUpper a] ++ "/g; ")
