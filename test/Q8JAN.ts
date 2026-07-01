import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { network } from "hardhat";

describe("Q8JAN", async function () {
  const { viem } = await network.connect();

  it("deploys with correct name, symbol, and supply", async function () {
    const [owner] = await viem.getWalletClients();

    const token = await viem.deployContract("Q8JAN", [
      owner.account.address,
    ]);

    const supply = await token.read.totalSupply();
    const ownerBalance = await token.read.balanceOf([owner.account.address]);

    assert.equal(await token.read.name(), "Q8JAN");
    assert.equal(await token.read.symbol(), "Q8JAN");
    assert.equal(supply, 100000000000n * 10n ** 18n);
    assert.equal(ownerBalance, supply);
  });

  it("allows token burning", async function () {
    const [owner] = await viem.getWalletClients();

    const token = await viem.deployContract("Q8JAN", [
      owner.account.address,
    ]);

    const burnAmount = 1000n * 10n ** 18n;
    const supplyBefore = await token.read.totalSupply();

    await token.write.burn([burnAmount]);

    const supplyAfter = await token.read.totalSupply();

    assert.equal(supplyAfter, supplyBefore - burnAmount);
  });

  it("allows owner to pause and unpause transfers", async function () {
    const [owner, user] = await viem.getWalletClients();

    const token = await viem.deployContract("Q8JAN", [
      owner.account.address,
    ]);

    await token.write.transfer([user.account.address, 1000n]);

    await token.write.pause();

    await assert.rejects(async () => {
      await token.write.transfer([user.account.address, 1n]);
    });

    await token.write.unpause();

    await token.write.transfer([user.account.address, 1n]);
  });
});